import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Neo4jModule } from 'src/neo4j/neo4j.module';
import UserSchema from 'src/schemas/user.schema';

@Module({
  imports: [
    Neo4jModule.forFeature(
      { User: UserSchema },
      {
        host: 'bolt://localhost',
        port: 7687,
        username: 'neo4j',
        password: 'neo4jadmin',
      },
    ),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
