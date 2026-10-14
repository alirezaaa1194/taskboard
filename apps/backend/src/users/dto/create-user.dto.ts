import {
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity.js';

export class CreateUserDto {
  @ApiProperty({ type: 'string', description: 'نام کاربر' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail({}, { message: 'ایمیل معتبر نیست' })
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6, { message: 'رمز عبور حداقل ۶ کاراکتر باشد' })
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.MEMBER })
  @IsEnum(UserRole, { message: 'نقش نامعتبر است' })
  role: UserRole;
}
