import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): object {
    return {
      message: 'Hello World!',
    };
  }

  async getPokemonByName(name: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`),
    );

    return data;
  }
}
