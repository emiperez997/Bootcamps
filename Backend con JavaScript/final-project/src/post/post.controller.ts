import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostClass } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post';
import { UpdatePostDto } from './dto/update-post';

@Controller('/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getPosts(): Promise<PostClass[]> {
    return this.postService.findAll();
  }

  @Get('/search')
  searchPost(@Query() queries: any): Promise<PostClass[]> {
    // TODO
    return this.postService.search({ query: queries.field });
  }

  @Get('/filter')
  filterPost(@Query() queries: any): Promise<PostClass[]> {
    // TODO
    return this.postService.filter({ query: queries.field });
  }

  @Get('/:id')
  getPostById(@Param('id') id: string): Promise<PostClass> {
    try {
      return this.postService.findOne({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/user/:id')
  getPostsByUserId(@Param('id') id: string): Promise<PostClass[]> {
    try {
      return this.postService.findByUserId({ userId: id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): Promise<PostClass> {
    return this.postService.create({ createPostDto });
  }

  @Put('/:id')
  updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostClass> {
    return this.postService.update({ id, updatePostDto });
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string): Promise<PostClass> {
    try {
      return this.postService.delete({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
