import { Controller, Get, Post, Body } from '@nestjs/common';
import { TestService } from './test.service';
import { Test } from './interfaces/test.interface';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async create(@Body('name') name: string): Promise<Test> {
    return this.testService.create(name);
  }

  @Get()
  async findAll(): Promise<Test[]> {
    return this.testService.findAll();
  }
}
