import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

interface User {
  id: number;
  name: string;
  surname: string;
  age: number;
}

@Injectable()
export class UserService {
  private users: User[];

  constructor() {
    this.users = [
      {
        id: 1,
        name: 'John',
        surname: 'Doe',
        age: 25,
      },
      {
        id: 2,
        name: 'Jane',
        surname: 'Doe',
        age: 30,
      },
      {
        id: 3,
        name: 'Bob',
        surname: 'Smith',
        age: 35,
      },
      {
        id: 4,
        name: 'Alice',
        surname: 'Johnson',
        age: 40,
      },
      {
        id: 5,
        name: 'Tom',
        surname: 'Brown',
        age: 45,
      },
    ];
  }

  getUsers(): object[] {
    return this.users;
  }

  getQuantity(): object {
    return {
      quantity: this.users.length,
    };
  }

  getUser(id: number): object {
    return this.users.find((user) => user.id === id);
  }

  createUser({
    name,
    surname,
    age,
  }: {
    name: string;
    surname: string;
    age: number;
  }): object {
    const lastId = this.users[this.users.length - 1].id;

    this.users.push({
      id: lastId + 1,
      name,
      surname,
      age,
    });

    return {
      id: lastId + 1,
      name,
      surname,
      age,
    };
  }
}
