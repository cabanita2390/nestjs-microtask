import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserResponseDto {
  @ApiProperty({ example: '1', description: 'The ID of the user' })
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({ example: 'user', description: 'The role of the user' })
  role: string;

  @ApiProperty({
    example: '2025-01-01T00:00:00.000Z',
    description: 'The creation date of the user',
  })
  created_at: Date;
}
