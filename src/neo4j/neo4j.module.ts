import { Module, DynamicModule } from '@nestjs/common';
import * as Neode from 'neode';
// import { fromEnv } from 'neode';
import { Neo4jService } from './neo4j.service';

interface Schema {
  [label: string]: Neode.SchemaObject;
}

@Module({
  providers: [Neo4jService],
})
export class Neo4jModule {
  static forRoot(connection?: any): DynamicModule {
    // if (!connection) {
    //   return {
    //     module: Neo4jModule,
    //     global: true,
    //     providers: [
    //       {
    //         provide: 'Connection',
    //         useFactory: async (): Promise<Neode> => {
    //           const connect: Neode = await fromEnv();
    //           return connect;
    //         },
    //       },
    //     ],
    //     exports: ['Connection'],
    //   };
    // }
    return {
      module: Neo4jModule,
      global: true,
      providers: [
        {
          provide: 'Connection',
          useFactory: async (): Promise<Neode> => {
            const connect: Neode = await new Neode(
              `${connection.host}:${connection.port}`,
              connection.username,
              connection.password,
            );
            return connect;
          },
        },
      ],
    };
  }

  static forFeature(schema: Schema, connection?: any): DynamicModule {
    // Check if connection its from env or provided config
    // if (!connection) {
    //   return {
    //     module: Neo4jModule,
    //     global: false,
    //     providers: [
    //       {
    //         provide: 'CONFIG',
    //         useValue: schema,
    //       },
    //       {
    //         provide: 'Connection',
    //         useFactory: async (): Promise<Neode> => {
    //           //   const connect = await fromEnv().with(schema);

    //           // If schema already installed It handle warn
    //           try {
    //             await connect.schema.install();
    //           } catch (error) {
    //             // handleWarn(Object.keys(schema)[0]);
    //           } finally {
    //             // return connect;
    //           }
    //         },
    //         inject: ['CONFIG'],
    //       },
    //     ],
    //     exports: ['Connection'],
    //   };
    // }
    // Create e new connection from URI
    return {
      module: Neo4jModule,
      global: false,
      providers: [
        {
          provide: 'CONFIG',
          useValue: schema,
        },
        {
          provide: 'Connection',
          useFactory: async (): Promise<Neode> => {
            const connect = await new Neode(
              `${connection.host}:${connection.port}`,
              connection.username,
              connection.password,
            ).with(schema);
            // If schema already installed It handle warn
            try {
              await connect.schema.install();
            } catch (error) {
              //   handleWarn(Object.keys(schema)[0]);
            } finally {
              return connect;
            }
          },
          inject: ['CONFIG'],
        },
      ],
      exports: ['Connection'],
    };
  }
}
