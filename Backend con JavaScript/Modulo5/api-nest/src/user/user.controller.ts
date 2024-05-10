import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Práctica GET
  @Get()
  getUsers(): object[] {
    return this.userService.getUsers();
  }

  @Get('/qty')
  getQuantity(): object {
    return this.userService.getQuantity();
  }

  @Get('/:id')
  getUser(@Param('id') id: string): object {
    return this.userService.getUser(Number(id));
  }

  // Método post
  // @Post()
  // addUser(@Body() userData: any): any {
  //   if (!userData.name) {
  //     throw new BadRequestException('El nombre es requerido');
  //   }
  //   return userData;
  // }

  // Práctica POST
  @Post()
  createUser(@Body() userData: any): any {
    if (!userData.name || !userData.surname || !userData.age) {
      throw new BadRequestException('Todos los campos son requeridos');
    }

    const response = this.userService.createUser(userData);

    return response;
  }
}
