import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/types/User';

@Injectable()
export class AuthService {
  testUser: User;

  constructor(private readonly jwtService: JwtService) {
    this.testUser = {
      id: 1,
      username: 'Juani',
      password: '1234',
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    if (
      this.testUser.username === username &&
      this.testUser.password === password
    ) {
      return { userId: this.testUser.id, username: this.testUser.username };
    }

    return null;
  }

  login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return {
      // Firmar el token
      access_token: this.jwtService.sign(payload),
    };
  }
}
