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
import { validate as isUUID } from 'uuid'; // Importar la función de validación de UUID

// Definir una interfaz para el tipo de retorno del método remove
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

  // Actualizar el método update para verificar si el usuario existe y manejar correctamente los errores
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Verificar si el usuario existe
    const existingUser = await this.usersRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    try {
      // Actualizar el usuario
      await this.usersRepository.update(id, updateUserDto);
      const updatedUser = await this.usersRepository.findOne({ where: { id } });
      return updatedUser;
    } catch (error) {
      if (error.code === '23505') {
        // Código de error de llave duplicada en PostgreSQL
        throw new ConflictException('Email already registered');
      }
      console.error('Error updating user:', error.message);
      throw new InternalServerErrorException('Error updating user in service');
    }
  }

  // Implementar el método remove para eliminar usuarios y manejar correctamente los errores
  async remove(id: string): Promise<RemoveUserResponse> {
    // Validar si el ID es un UUID válido
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    // Verificar si el usuario existe
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    try {
      // Eliminar el usuario
      await this.usersRepository.delete(id);
      return { message: `User with ID ${id} was successfully deleted`, user };
    } catch (error) {
      console.error('Error deleting user:', error.message);
      throw new InternalServerErrorException('Error deleting user in service');
    }
  }
}
