import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { User, UserRole } from '../entities/user.entity.js';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findById(id: number): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async findAll(query: {
    search?: string;
    role?: UserRole;
    page: number;
    limit: number;
  }): Promise<{ items: User[]; total: number }> {
    const { search, role, page, limit } = query;
    const where: any = {};

    if (search) {
      where.name = ILike(`%${search}%`);
    }
    if (role) {
      where.role = role;
    }

    const [items, total] = await this.repo.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { items, total };
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async update(id: number, data: Partial<User>): Promise<User | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async countActiveOwners(): Promise<number> {
    return this.repo.count({
      where: { role: UserRole.OWNER, isActive: true },
    });
  }
}
