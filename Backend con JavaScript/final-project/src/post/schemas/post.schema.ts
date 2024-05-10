import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type PostDocument = HydratedDocument<PostClass>;

@Schema({ timestamps: true })
export class PostClass {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  body: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  authorId: string;
}

export const PostSchema = SchemaFactory.createForClass(PostClass);
