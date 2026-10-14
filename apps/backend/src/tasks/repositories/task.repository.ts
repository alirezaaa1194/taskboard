import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus, TaskPriority } from '../entities/task.entity.js';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repo: Repository<Task>,
  ) {}

  async findById(id: number): Promise<Task | null> {
    return this.repo.findOne({
      where: { id },
      relations: { assignee: true, createdBy: true },
    });
  }

  async findAll(query: {
    status?: TaskStatus;
    priority?: TaskPriority;
    assigneeId?: number;
    search?: string;
    page: number;
    limit: number;
    // Access filter for Member
    ownerUserId?: number; // If checked, only this user's tasks.
  }): Promise<{ items: Task[]; total: number }> {
    const qb = this.repo
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.assignee', 'assignee')
      .leftJoinAndSelect('task.createdBy', 'createdBy');

    if (query.ownerUserId) {
      qb.andWhere('(task.createdById = :uid OR task.assigneeId = :uid)', {
        uid: query.ownerUserId,
      });
    }

    if (query.status) {
      qb.andWhere('task.status = :status', { status: query.status });
    }

    if (query.priority) {
      qb.andWhere('task.priority = :priority', { priority: query.priority });
    }

    if (query.assigneeId) {
      qb.andWhere('task.assigneeId = :assigneeId', {
        assigneeId: query.assigneeId,
      });
    }

    if (query.search) {
      qb.andWhere('task.title ILIKE :search', {
        search: `%${query.search}%`,
      });
    }

    qb.orderBy('task.createdAt', 'DESC')
      .skip((query.page - 1) * query.limit)
      .take(query.limit);

    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  async create(data: Partial<Task>): Promise<Task> {
    const task = this.repo.create(data);
    return this.repo.save(task);
  }

  async update(id: number, data: Partial<Task>): Promise<Task | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
