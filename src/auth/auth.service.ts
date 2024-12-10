// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service'; // Assuming you have a UserService

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService, // Inject UserService to validate users
  ) {}

  // Validate user credentials (username and password)
  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user; // Return user if valid
    }
    return null; // Return null if invalid
  }

  // Sign JWT token and return it
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Validate JWT token user
  async validateJwtUser(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
