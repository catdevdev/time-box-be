import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { BoxesModule } from './boxes/boxes.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { WarehousesService } from './warehouses/warehouses.service';
import { BoxesService } from './boxes/boxes.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      renderPath: 'uploads',
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      installSubscriptionHandlers: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://cat:4311067vladvk@cluster0.e6s6i.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    BoxesModule,
    WarehousesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
