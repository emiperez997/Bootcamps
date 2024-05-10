import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Leer (Read)
  @Get('/test')
  getHello(): object {
    return this.appService.getHello();
  }

  @Get('/api/items')
  getItems(@Query() queries: any): number[] {
    // const page = queries.page;id

    const esPar = queries.esPar;

    // console.log(Boolean(queries.esPar === 'true'));

    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    if (esPar === 'true') {
      return items.filter((item) => item % 2 === 0);
    } else {
      return items.filter((item) => item % 2 !== 0);
    }
  }

  @Get('/api/items/:id')
  getItem(@Param() params: any): any {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const searchId = params.id;

    const item = items.find((item) => item === Number(searchId));

    return {
      item,
      searchId,
    };
  }

  // @Get('/api/users/:name')
  // getUser(@Param() allParams: any): any {
  //   return allParams;
  // }

  // @Get('/api/pokemon/:name')
  // async getPokemon(@Param('name') pokemon: string): Promise<any> {
  //   // console.log(this.appService.getPokemonByName('ditto'));

  //   // const data = await firstValueFrom(
  //   //   this.appService.getPokemonByName(pokemon),
  //   // );

  //   const pokemonData = await this.appService.getPokemonByName(pokemon);

  //   return pokemonData;
  // }
}
