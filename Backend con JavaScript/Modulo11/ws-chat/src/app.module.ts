import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ChatModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
