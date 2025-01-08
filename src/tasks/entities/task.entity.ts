import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tasks')
export class Task {
  @ApiProperty({ example: '1', description: 'The ID of the task' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Task Title', description: 'The title of the task' })
  @Column()
  title: string;

  @ApiProperty({
    example: 'Task Description',
    description: 'The description of the task',
  })
  @Column()
  description: string;

  @ApiProperty({
    example: false,
    description: 'The completion status of the task',
  })
  @Column({ default: false })
  completed: boolean;

  @ApiProperty({
    example: '2025-01-01T00:00:00.000Z',
    description: 'The creation date of the task',
  })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({
    example: '2025-01-01T00:00:00.000Z',
    description: 'The last update date of the task',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
