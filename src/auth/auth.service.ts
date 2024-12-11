// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service'; // Assuming you have a UserService
import { LoginUserDto } from './dto/LoginUserDto.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService, // Inject UserService to validate users
  ) {}

  // Validate user credentials (username and password)
  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user; // Return user if valid
    }
    return null; // Return null if invalid
  }

  // Sign JWT token and return it
  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findUserByEmail(loginUserDto.email);
    const payload = {
      role: user.role_id,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Validate JWT token user
  async validateJwtUser(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
