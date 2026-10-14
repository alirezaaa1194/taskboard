import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'ایمیل معتبر نیست' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'رمز عبور حداقل ۶ کاراکتر باشد' })
  password: string;
}