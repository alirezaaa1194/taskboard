import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { TaskRepository } from './repositories/task.repository.js';
import { UserRepository } from '../users/repositories/user.repository.js';
import { Task } from './entities/task.entity.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { QueryTasksDto } from './dto/query-tasks.dto.js';
import { User, UserRole } from '../users/entities/user.entity.js';

@Injectable()
export class TasksService {
  constructor(
    private readonly taskRepo: TaskRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async findAll(query: QueryTasksDto, currentUser: User) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    // The member sees only their own tasks.
    const ownerUserId =
      currentUser.role === UserRole.MEMBER ? currentUser.id : undefined;

    const { items, total } = await this.taskRepo.findAll({
      status: query.status,
      priority: query.priority,
      assigneeId: query.assigneeId,
      search: query.search,
      page,
      limit,
      ownerUserId,
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

  async findOne(id: number, currentUser: User) {
    const task = await this.taskRepo.findById(id);
    if (!task) throw new NotFoundException('تسک یافت نشد');

    this.assertCanView(task, currentUser);

    return this.toResponse(task);
  }

  async create(dto: CreateTaskDto, currentUser: User) {
    if (currentUser.role === UserRole.MEMBER && dto.assigneeId) {
      throw new ForbiddenException('شما نمی‌توانید تسک به دیگران اختصاص دهید');
    }

    if (dto.assigneeId) {
      const assignee = await this.userRepo.findById(dto.assigneeId);
      if (!assignee || !assignee.isActive) {
        throw new BadRequestException('کاربر مسئول یافت نشد یا غیرفعال است');
      }
    }

    const created = await this.taskRepo.create({
      title: dto.title,
      status: dto.status,
      priority: dto.priority,
      description: dto.description ?? null,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      assigneeId: dto.assigneeId ?? null,
      createdById: currentUser.id,
    });

    // ← این خط رو اضافه کن: دوباره با relations بخون
    const task = await this.taskRepo.findById(created.id);
    if (!task) throw new NotFoundException('تسک یافت نشد');

    return this.toResponse(task);
  }

  async update(id: number, dto: UpdateTaskDto, currentUser: User) {
    const task = await this.taskRepo.findById(id);
    if (!task) throw new NotFoundException('تسک یافت نشد');

    this.assertCanEdit(task, currentUser);

    if (currentUser.role === UserRole.MEMBER && dto.assigneeId !== undefined) {
      throw new ForbiddenException('شما نمی‌توانید تسک به دیگران اختصاص دهید');
    }

    if (dto.assigneeId) {
      const assignee = await this.userRepo.findById(dto.assigneeId);
      if (!assignee || !assignee.isActive) {
        throw new BadRequestException('کاربر مسئول یافت نشد یا غیرفعال است');
      }
    }

    const updateData: Partial<Task> = {};
    if (dto.title !== undefined) updateData.title = dto.title;
    if (dto.status !== undefined) updateData.status = dto.status;
    if (dto.priority !== undefined) updateData.priority = dto.priority;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.dueDate !== undefined)
      updateData.dueDate = dto.dueDate ? new Date(dto.dueDate) : null;
    if (dto.assigneeId !== undefined) updateData.assigneeId = dto.assigneeId;

    const updated = await this.taskRepo.update(id, updateData);
    if (!updated) throw new NotFoundException('تسک یافت نشد');

    // ← این خط رو اضافه کن
    const fresh = await this.taskRepo.findById(id);
    if (!fresh) throw new NotFoundException('تسک یافت نشد');

    return this.toResponse(fresh);
  }

  async delete(id: number, currentUser: User) {
    const task = await this.taskRepo.findById(id);
    if (!task) throw new NotFoundException('تسک یافت نشد');

    this.assertCanDelete(task, currentUser);

    await this.taskRepo.delete(id);
  }

  // Authorization helpers

  private assertCanView(task: Task, user: User) {
    if (user.role === UserRole.OWNER || user.role === UserRole.MANAGER) return;
    // Member: Only their own tasks
    if (task.createdById === user.id || task.assigneeId === user.id) return;
    throw new ForbiddenException('شما به این تسک دسترسی ندارید');
  }

  private assertCanEdit(task: Task, user: User) {
    if (user.role === UserRole.OWNER || user.role === UserRole.MANAGER) return;
    // Member: Only their own tasks (created or assigned)
    if (task.createdById === user.id || task.assigneeId === user.id) return;
    throw new ForbiddenException('شما به این تسک دسترسی ندارید');
  }

  private assertCanDelete(task: Task, user: User) {
    if (user.role === UserRole.OWNER || user.role === UserRole.MANAGER) return;
    // Member: Only their own tasks (created by them)
    if (task.createdById === user.id) return;
    throw new ForbiddenException('شما نمی‌توانید این تسک را حذف کنید');
  }

  private toResponse(task: Task) {
    return {
      id: task.id,
      title: task.title,
      status: task.status,
      priority: task.priority,
      description: task.description,
      dueDate: task.dueDate,
      assignee: task.assignee
        ? {
            id: task.assignee.id,
            name: task.assignee.name,
            email: task.assignee.email,
          }
        : null,
      createdBy: {
        id: task.createdBy.id,
        name: task.createdBy.name,
        email: task.createdBy.email,
      },
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
