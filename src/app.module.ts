import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { BoxsResolver } from './boxs/boxs.resolver';
import { BoxsModule } from './boxs/boxs.module';
import { BoxesModule } from './boxes/boxes.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { WarehousesModule } from './warehouses/warehouses.module';

@Module({
  imports: [
    CatsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    MongooseModule.forRoot(
      'mongodb+srv://cat:4311067vladvk@cluster0.4vsh8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    BoxesModule,
    WarehousesModule,
  ],
  controllers: [AppController],
  providers: [AppService, BoxsResolver],
})
export class AppModule {}
