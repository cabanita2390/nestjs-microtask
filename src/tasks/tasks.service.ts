import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';
import { CreateTaskDto } from './interfaces/create-task.dto';
import { UpdateTaskDto } from './interfaces/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const task = this.tasksRepository.create({ ...createTaskDto, user });
      return await this.tasksRepository.save(task);
    } catch (error) {
      console.error('Error creating task:', error.message);
      throw new InternalServerErrorException('Error creating task in service');
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      return await this.tasksRepository.find({ relations: ['user'] });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching tasks');
    }
  }

  async findOne(id: string): Promise<Task> {
    try {
      const task = await this.tasksRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return task;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error fetching task');
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const task = await this.tasksRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      Object.assign(task, updateTaskDto);
      return await this.tasksRepository.save(task);
    } catch (error) {
      console.error('Error updating task:', error.message);
      throw new InternalServerErrorException('Error updating task in service');
    }
  }

  async delete(id: string): Promise<{ message: string; task: Task }> {
    try {
      const task = await this.tasksRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      await this.tasksRepository.remove(task);
      return { message: `Task with ID ${id} was successfully deleted`, task };
    } catch (error) {
      console.error('Error deleting task:', error.message);
      throw new InternalServerErrorException('Error deleting task in service');
    }
  }
}
