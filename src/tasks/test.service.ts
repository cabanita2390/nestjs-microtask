import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test } from './interfaces/test.interface';

@Injectable()
export class TestService {
  constructor(@InjectModel('Test') private readonly testModel: Model<Test>) {}

  async create(name: string): Promise<Test> {
    const createdTest = new this.testModel({ name });
    return createdTest.save();
  }

  async findAll(): Promise<Test[]> {
    return this.testModel.find().exec();
  }
}
