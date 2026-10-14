import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserRepository } from './repositories/user.repository.js';
import { User, UserRole } from './entities/user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { QueryUsersDto } from './dto/query-users.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

  async findById(id: number): Promise<User | null> {
    return this.userRepo.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }

  async findAll(query: QueryUsersDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const { items, total } = await this.userRepo.findAll({
      search: query.search,
      role: query.role,
      page,
      limit,
    });

    return {
      items: items.map(this.toResponse),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(dto: CreateUserDto) {
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('این ایمیل قبلاً ثبت شده است');
    }

    const hashedPassword = await argon2.hash(dto.password);

    const user = await this.userRepo.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
      isActive: true,
    });

    return this.toResponse(user);
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException('کاربر یافت نشد');
    }

    // Last owner logic
    const isOwner = user.role === UserRole.OWNER;
    const willBeDisabled = dto.isActive === false;
    const willBeDowngraded = dto.role && dto.role !== UserRole.OWNER;

    if (isOwner && (willBeDisabled || willBeDowngraded)) {
      const activeOwners = await this.userRepo.countActiveOwners();
      if (activeOwners <= 1) {
        throw new BadRequestException(
          'آخرین مالک فعال را نمی‌توان غیرفعال یا تنزل داد',
        );
      }
    }

    const updated = await this.userRepo.update(id, dto);
    if (!updated) {
      throw new NotFoundException('کاربر یافت نشد');
    }

    return this.toResponse(updated);
  }

  private toResponse(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
