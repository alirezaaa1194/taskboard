import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  @Column({ type: 'jsonb', nullable: true })
  description: object | null;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date | null;

  @ManyToOne(() => User, (user) => user.assignedTasks, {
    nullable: true,
  })
  @JoinColumn({ name: 'assigneeId' })
  assignee: Relation<User> | null;

  @Column({ type: 'uuid', nullable: true })
  assigneeId: string | null;

  @ManyToOne(() => User, (user) => user.createdTasks)
  @JoinColumn({ name: 'createdById' })
  createdBy: Relation<User>;

  @Column({ type: 'uuid' })
  createdById: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
