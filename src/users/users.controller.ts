/* eslint-disable @typescript-eslint/no-unused-vars */
// src/users/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './DTOs/create-user.dto';
// import { UpdateUserDto } from './DTOs/update-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './DTOs/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // async create(@Body() createUserDto: CreateUserDto): Promise<User> {
  async create(@Body() createUserDto: CreateUserDto) {
    const response = await this.usersService.create(createUserDto);
    return response;
    // return 'prueba controlador';
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
