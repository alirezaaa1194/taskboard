import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dto/user-response.dto.js';

export class LoginResponseDto {
  @ApiProperty({
    type: UserResponseDto,
    description: 'اطلاعات کاربر لاگین‌شده',
  })
  user: UserResponseDto;
}
