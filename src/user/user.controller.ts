// src/user/user.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint to register a user
  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    return this.userService.register(body.username, body.password);
  }
}
