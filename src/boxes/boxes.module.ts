import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoxesResolver } from './boxes.resolver';
import { BoxesService } from './boxes.service';
import { Box, BoxSchema } from './schemas/box.schema';
import { BoxesController } from './boxes.controller';


@Module({
  imports: [MongooseModule.forFeature([{ name: Box.name, schema: BoxSchema }])],
  providers: [BoxesResolver, BoxesService],
  controllers: [BoxesController],
})
export class BoxesModule {}
