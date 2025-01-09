import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { RemoveUserResponse, UsersService } from './users.service';
import { CreateUserDto } from './DTOs/create-user.dto';
import { UpdateUserDto } from './DTOs/update-user.dto';
import { UserResponseDto } from './DTOs/user-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { SelfGuard } from 'src/auth/self.guard';
import { User } from './entities/user.entity';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const response = await this.usersService.create(createUserDto);
    return response;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard, SelfGuard)
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, SelfGuard)
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get a user by email' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, SelfGuard)
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<RemoveUserResponse> {
    const currentUser = req.user;
    return this.usersService.remove(id, currentUser);
  }
}
