import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('/api/pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('/:name')
  getPokemonByName(@Param('name') name: string) {
    try {
      return this.pokemonService.getPokemon(name);
    } catch (error) {
      throw new HttpException(
        'Error al obtener el Pokémon',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/compare/:firstPokemon/:secondPokemon')
  comparePokemons(
    @Param('firstPokemon') firstPokemon: string,
    @Param('secondPokemon') secondPokemon: string,
  ) {
    try {
      const compare = this.pokemonService.comparePokemon(
        firstPokemon,
        secondPokemon,
      );
      return compare;
    } catch (error) {
      throw new HttpException(
        'Error al obtener la comparación Pokémon',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
