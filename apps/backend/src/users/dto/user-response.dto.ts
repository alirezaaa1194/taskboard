import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity.js';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'شناسه کاربر' })
  id: number;

  @ApiProperty({ example: 'مالک سیستم', description: 'نام کاربر' })
  name: string;

  @ApiProperty({ example: 'owner@taskboard.local', description: 'ایمیل' })
  email: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.OWNER,
    description: 'نقش کاربر',
  })
  role: UserRole;

  @ApiProperty({ example: true, description: 'وضعیت فعال بودن' })
  isActive: boolean;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
