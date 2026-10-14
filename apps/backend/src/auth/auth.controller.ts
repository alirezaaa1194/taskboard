import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiCookieAuth,
} from '@nestjs/swagger';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { LoginResponseDto } from './dto/login-response.dto.js';
import { UserResponseDto } from '../users/dto/user-response.dto.js';
import { Public } from './decorators/public.decorator.js';
import { CurrentUser } from './decorators/current-user.decorator.js';
import { User } from '../users/entities/user.entity.js';
import { MessageResponseDto } from '../common/dto/api-response.dto.js';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: LoginResponseDto, description: 'ورود موفق' })
  @ApiUnauthorizedResponse({ description: 'ایمیل یا رمز عبور اشتباه است' })
  @ApiForbiddenResponse({ description: 'حساب کاربری غیرفعال است' })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, user } = await this.authService.login(
      dto.email,
      dto.password,
    );

    this.setTokenCookies(res, accessToken, refreshToken);

    return { user };
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth('refresh_token')
  @ApiOkResponse({
    type: LoginResponseDto,
    description: 'توکن‌ها با موفقیت تمدید شدند',
  })
  @ApiUnauthorizedResponse({ description: 'رفرش توکن نامعتبر یا منقضی شده' })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      res.status(HttpStatus.UNAUTHORIZED);
      return { message: 'رفرش توکن یافت نشد' };
    }

    const {
      accessToken,
      refreshToken: newRefreshToken,
      user,
    } = await this.authService.refresh(refreshToken);

    this.setTokenCookies(res, accessToken, newRefreshToken);

    return { user };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth('access_token')
  @ApiOkResponse({ type: MessageResponseDto, description: 'خروج موفق' })
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() user: User,
  ) {
    const refreshToken = req.cookies?.refresh_token;
    if (refreshToken) {
      await this.authService.logout(user.id, refreshToken);
    }

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return { message: 'خروج موفق' };
  }

  @Get('me')
  @ApiCookieAuth('access_token')
  @ApiOkResponse({ type: UserResponseDto, description: 'اطلاعات کاربر' })
  @ApiUnauthorizedResponse({ description: 'احراز هویت نشده' })
  async getMe(@CurrentUser() user: User) {
    return this.authService.getMe(user.id);
  }

  private setTokenCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
      path: '/',
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      ...(process.env.NODE_ENV === 'production'
        ? { path: '/api/v1/auth/refresh' }
        : {}),
    });
  }
}
