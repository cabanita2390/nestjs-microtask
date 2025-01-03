import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './DTOs/create-user.dto';
import { UpdateUserDto } from './DTOs/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Verificar si el correo electrónico ya está registrado
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    try {
      // Crear el nuevo usuario
      const user = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // Código de error de llave duplicada en PostgreSQL
        throw new ConflictException('Email already registered');
      }
      console.error('Error creating user:', error.message);
      throw new InternalServerErrorException('Error creating user in service');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
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
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      await this.usersRepository.delete(id);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error deleting user');
    }
  }
}
