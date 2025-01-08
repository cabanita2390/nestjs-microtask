import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TestService } from './test.service';
import { Test } from './interfaces/test.interface';

@ApiTags('test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @ApiOperation({ summary: 'Create a new test' })
  @ApiResponse({
    status: 201,
    description: 'The test has been successfully created.',
  })
  @Post()
  async create(@Body('name') name: string): Promise<Test> {
    return this.testService.create(name);
  }

  @ApiOperation({ summary: 'Get all tests' })
  @ApiResponse({ status: 200, description: 'Return all tests.' })
  @Get()
  async findAll(): Promise<Test[]> {
    return this.testService.findAll();
  }
}
