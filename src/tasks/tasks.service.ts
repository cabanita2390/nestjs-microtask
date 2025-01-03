/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './interfaces/create-task.dto';
import { UpdateTaskDto } from './interfaces/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  // async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<string> {
    // // return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
    // return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
    return 'prueba de update';
  }

  // async delete(id: string): Promise<Task> {
  async delete(id: string): Promise<string> {
    // return this.taskModel.findByIdAndRemove(id).exec();
    return 'prueba de delete';
  }
}
