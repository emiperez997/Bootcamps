import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostClass as Post } from './schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post';
import { UpdatePostDto } from './dto/update-post';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.find().lean();
  }

  async findOne({ id }: { id: string }): Promise<Post> {
    return this.postModel.findById(id).lean();
  }

  async findByUserId({ userId }: { userId: string }): Promise<Post[]> {
    return this.postModel.find({ userId }).lean();
  }

  async create({
    createPostDto,
  }: {
    createPostDto: CreatePostDto;
  }): Promise<Post> {
    return this.postModel.create(createPostDto);
  }

  async update({
    id,
    updatePostDto,
  }: {
    id: string;
    updatePostDto: UpdatePostDto;
  }): Promise<Post> {
    return this.postModel.findByIdAndUpdate(id, updatePostDto).lean();
  }

  async delete({ id }: { id: string }): Promise<Post> {
    return this.postModel.findByIdAndDelete(id).lean();
  }

  async search({ query }: { query: string }): Promise<Post[]> {
    return this.postModel
      .find({
        $text: {
          $search: query,
        },
      })
      .lean();
  }

  async filter({ query }: { query: string }): Promise<Post[]> {
    return this.postModel
      .find({
        $text: {
          $search: query,
        },
      })
      .lean();
  }
}
