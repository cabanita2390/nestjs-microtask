import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/tasks/entities/task.entity';

@Entity('users')
export class User {
  @ApiProperty({ example: '1', description: 'The ID of the user' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @Column()
  password: string;

  @ApiProperty({
    example: 'user',
    description: 'The role of the user',
    default: 'user',
  })
  @Column({ default: 'user' }) // Asignar el valor por defecto 'user'
  role: string;

  @ApiProperty({
    example: '2025-01-01T00:00:00.000Z',
    description: 'The creation date of the user',
  })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
