import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiCookieAuth,
  ApiParam,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { QueryTasksDto } from './dto/query-tasks.dto.js';
import { TaskResponseDto } from './dto/task-response.dto.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { User } from '../users/entities/user.entity.js';
import { MessageResponseDto } from '../common/dto/api-response.dto.js';

@ApiTags('Tasks')
@ApiCookieAuth('access_token')
@Controller('todos')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOkResponse({ description: 'لیست تسک‌ها' })
  async findAll(@Query() query: QueryTasksDto, @CurrentUser() user: User) {
    return this.tasksService.findAll(query, user);
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOkResponse({ type: TaskResponseDto })
  @ApiNotFoundResponse({ description: 'تسک یافت نشد' })
  @ApiForbiddenResponse({ description: 'دسترسی ندارید' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    return this.tasksService.findOne(id, user);
  }

  @Post()
  @ApiCreatedResponse({ type: TaskResponseDto })
  @ApiForbiddenResponse({ description: 'Member نمی‌تواند assign کند' })
  async create(@Body() dto: CreateTaskDto, @CurrentUser() user: User) {
    return this.tasksService.create(dto, user);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOkResponse({ type: TaskResponseDto })
  @ApiForbiddenResponse({ description: 'دسترسی ندارید' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
    @CurrentUser() user: User,
  ) {
    return this.tasksService.update(id, dto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', example: 1 })
  @ApiOkResponse({ type: MessageResponseDto })
  @ApiForbiddenResponse({ description: 'دسترسی ندارید' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    await this.tasksService.delete(id, user);
    return { message: 'تسک با موفقیت حذف شد' };
  }
}
