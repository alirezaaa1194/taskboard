import {
  IsString,
  IsEnum,
  IsOptional,
  IsInt,
  MinLength,
  MaxLength,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '../entities/task.entity.js';
import { TiptapNodeDto } from './tiptap-content.dto.js';

export class CreateTaskDto {
  @ApiProperty({ example: 'طراحی صفحه اصلی' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({ enum: TaskStatus, default: TaskStatus.TODO })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({ enum: TaskPriority, default: TaskPriority.MEDIUM })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiPropertyOptional({ example: 2, description: 'شناسه کاربر مسئول' })
  @IsOptional()
  @IsInt()
  assigneeId?: number | null;

  @ApiPropertyOptional({ example: '2025-02-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  dueDate?: string | null;

  @ApiPropertyOptional({ type: TiptapNodeDto, description: 'TipTap JSON' })
  @IsOptional()
  @ValidateNested()
  @Type(() => TiptapNodeDto)
  description?: TiptapNodeDto | null;
}
