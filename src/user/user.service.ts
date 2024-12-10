// src/user/user.service.ts

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  private users = []; // This is just a placeholder, replace with your database

  // Register a new user with hashed password
  async register(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = { username, password: hashedPassword };
    this.users.push(newUser); // Replace with actual DB logic
    return newUser;
  }

  // Find a user by username
  async findByUsername(username: string) {
    return this.users.find((user) => user.username === username); // Replace with actual DB logic
  }
}
