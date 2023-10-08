import { Inject, Injectable } from '@nestjs/common';
import * as Neode from 'neode';

export interface IUser {
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(@Inject('Connection') private readonly neode: Neode) {}

  async createUser(dto: IUser) {
    try {
      const user = await this.neode.create('User', dto);
      return user.toJson();
    } catch (error) {
      throw error;
    }
  }
}
