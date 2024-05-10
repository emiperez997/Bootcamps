import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PokemonService {
  constructor(private readonly httpService: HttpService) {}

  async getPokemon(name: string): Promise<any> {
    const { data } = await firstValueFrom(
      await this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`),
    );

    return data;
  }

  async comparePokemon(
    firstPokemon: string,
    secondPokemon: string,
  ): Promise<any> {
    try {
      const firstPokemonData = await this.getPokemon(firstPokemon);
      const secondPokemonData = await this.getPokemon(secondPokemon);

      const firstPokemonStats = firstPokemonData.stats;
      const secondPokemonStats = secondPokemonData.stats;

      const higherHp =
        firstPokemonStats[0].base_stat > secondPokemonStats[0].base_stat
          ? firstPokemonData.name
          : secondPokemonData.name;

      const higherAttack =
        firstPokemonStats[1].base_stat > secondPokemonStats[1].base_stat
          ? firstPokemonData.name
          : secondPokemonData.name;

      const higherDefense =
        firstPokemonStats[2].base_stat > secondPokemonStats[2].base_stat
          ? firstPokemonData.name
          : secondPokemonData.name;

      const response = {
        higherHp,
        higherAttack,
        higherDefense,
      };

      return response;
    } catch (error) {
      throw new BadRequestException('Someting went wrong');
    }
  }
}
