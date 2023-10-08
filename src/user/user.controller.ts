import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async test() {
    return await this.userService.createUser({
      name: 'Test',
      email: 'riteshbenjwal7@gmail.com',
    });
  }
}
