import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from './neo4j/neo4j.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    Neo4jModule.forRoot({
      host: 'bolt://localhost',
      port: 7687,
      username: 'neo4j',
      password: 'neo4jadmin',
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
