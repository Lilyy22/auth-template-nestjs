// src/auth/auth.controller.ts

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginUserDto } from './dto/LoginUserDto.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // User login
  @Post('login')
  @UseGuards(LocalAuthGuard) // Protect login route with local strategy
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto); // Generate JWT token
  }

  // Protected route using JWT
  @Post('profile')
  @UseGuards(JwtAuthGuard) // Protect route with JWT guard
  getProfile(@Body() body) {
    return body; // Return user profile data here
  }
}
