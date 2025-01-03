import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './interfaces/create-task.dto';
import { Task } from './interfaces/task.interface';
import { UpdateTaskDto } from './interfaces/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    // ): Promise<Task> {
  ): Promise<string> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  // async delete(@Param('id') id: string): Promise<Task> {
  async delete(@Param('id') id: string): Promise<string> {
    return this.tasksService.delete(id);
  }
}
