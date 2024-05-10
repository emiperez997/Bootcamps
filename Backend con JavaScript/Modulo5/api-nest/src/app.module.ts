import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HttpModule } from '@nestjs/axios';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [UserModule, HttpModule, PokemonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
