import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create({ createUserDto });
  }

  @Post('/login')
  async login() {
    // TODO
    return 'TODO: Login';
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update({ id, updateUserDto });
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    try {
      return await this.userService.findOne({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    try {
      return this.userService.delete({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
