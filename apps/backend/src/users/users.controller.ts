import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { QueryUsersDto } from './dto/query-users.dto.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { UserRole } from './entities/user.entity.js';

@ApiTags('Users')
@ApiCookieAuth('access_token')
@Controller('users')
@Roles(UserRole.OWNER)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ description: 'لیست کاربران' })
  async findAll(@Query() query: QueryUsersDto) {
    return this.usersService.findAll(query);
  }

  @Post()
  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiConflictResponse({ description: 'ایمیل تکراری است' })
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiNotFoundResponse({ description: 'کاربر یافت نشد' })
  @ApiBadRequestResponse({ description: 'آخرین مالک فعال قابل تغییر نیست' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(id, dto);
  }
}
