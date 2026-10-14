import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity.js';
import { RefreshToken } from '../../auth/entities/refresh-token.entity.js';

export enum UserRole {
  OWNER = 'owner',
  MANAGER = 'manager',
  MEMBER = 'member',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Task, (task) => task.createdBy)
  createdTasks: Relation<Task[]>;

  @OneToMany(() => Task, (task) => task.assignee)
  assignedTasks: Relation<Task[]>;

  @OneToMany(() => RefreshToken, (rt) => rt.user)
  refreshTokens: Relation<RefreshToken[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
