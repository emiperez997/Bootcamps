import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // usernameField: El campo que contiene el campo que se va a evaluar
    super({ usernameField: 'username' });
  }

  async validate(username: string, password: string): Promise<any> {
    // Aplicamos el principio de responsabilidad única
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
