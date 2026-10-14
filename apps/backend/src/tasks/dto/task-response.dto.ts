import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '../entities/task.entity.js';

class TaskUserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'سارا محمدی' })
  name: string;

  @ApiProperty({ example: 'sara@taskboard.local' })
  email: string;
}

export class TaskResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'طراحی صفحه اصلی' })
  title: string;

  @ApiProperty({ enum: TaskStatus })
  status: TaskStatus;

  @ApiProperty({ enum: TaskPriority })
  priority: TaskPriority;

  @ApiProperty({ example: { type: 'doc', content: [] } })
  description: object | null;

  @ApiProperty({ example: '2025-02-01T00:00:00.000Z', nullable: true })
  dueDate: Date | null;

  @ApiProperty({ type: TaskUserDto, nullable: true })
  assignee: TaskUserDto | null;

  @ApiProperty({ type: TaskUserDto })
  createdBy: TaskUserDto;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
