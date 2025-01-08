/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('email', email);
    console.log('pass', pass);

    const user = await this.usersService.findByEmail(email);
    console.log('user', user);

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      console.log('isMatch', isMatch);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role }; // Incluir el rol del usuario en el payload
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
