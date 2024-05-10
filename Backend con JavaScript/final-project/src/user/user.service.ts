import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().lean();
  }

  async findOne({ id }: { id: string }): Promise<User> {
    return this.userModel.findById(id).lean();
  }

  async create({
    createUserDto,
  }: {
    createUserDto: CreateUserDto;
  }): Promise<User> {
    console.log(createUserDto);

    return this.userModel.create(createUserDto);
  }

  async update({
    id,
    updateUserDto,
  }: {
    id: string;
    updateUserDto: UpdateUserDto;
  }): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto).lean();
  }

  async delete({ id }: { id: string }): Promise<User> {
    return this.userModel.findByIdAndDelete(id).lean();
  }

  async login({ email, password }: { email: string; password: string }) {
    return {
      email,
      password,
    };
  }
}
