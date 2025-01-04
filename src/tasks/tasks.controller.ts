import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
// import { CreateTaskDto } from './interfaces/create-task.dto';
// import { UpdateTaskDto } from './interfaces/update-task.dto';
import { UsersService } from 'src/users/users.service';
import { validate as isUUID } from 'uuid';
import { CreateTaskDto } from './interfaces/create-task.dto';
import { UpdateTaskDto } from './interfaces/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService,
  ) {}

  @Post(':userId')
  async create(
    @Param('userId') userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    if (!isUUID(userId)) {
      throw new BadRequestException('User ID must be a valid UUID');
    }

    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<{ message: string; task: Task }> {
    return this.tasksService.delete(id);
  }
}
