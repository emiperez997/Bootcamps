import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user.schema';
import { PostClass } from 'src/post/schemas/post.schema';
import { PostService } from 'src/post/post.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Get('/users')
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Delete('/users/:id')
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.delete({ id });
  }

  @Get('/posts')
  getPosts(): Promise<PostClass[]> {
    return this.postService.findAll();
  }
}
