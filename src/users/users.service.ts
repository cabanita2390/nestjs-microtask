import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './DTOs/create-user.dto';
import { UpdateUserDto } from './DTOs/update-user.dto';
import { validate as isUUID } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './DTOs/user-response.dto';

export interface RemoveUserResponse {
  message: string;
  user: User;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword,
        role: 'user',
      });
      const savedUser = await this.usersRepository.save(user);
      const { password, tasks, ...result } = savedUser;
      return result as UserResponseDto;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already registered');
      }
      console.error('Error creating user:', error.message);
      throw new InternalServerErrorException('Error creating user in service');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find({ relations: ['tasks'] });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching users');
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error fetching user');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    try {
      await this.usersRepository.update(id, updateUserDto);
      const updatedUser = await this.usersRepository.findOne({ where: { id } });
      return updatedUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already registered');
      }
      console.error('Error updating user:', error.message);
      throw new InternalServerErrorException('Error updating user in service');
    }
  }

  async remove(id: string): Promise<RemoveUserResponse> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    try {
      await this.usersRepository.delete(id);
      return { message: `User with ID ${id} was successfully deleted`, user };
    } catch (error) {
      console.error('Error deleting user:', error.message);
      throw new InternalServerErrorException('Error deleting user in service');
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }
      return user;
    } catch (error) {
      console.error('Error finding user by email:', error.message);
      throw new InternalServerErrorException('Error finding user by email');
    }
  }
}