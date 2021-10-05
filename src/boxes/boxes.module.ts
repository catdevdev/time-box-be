import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoxesResolver } from './boxes.resolver';
import { BoxesService } from './boxes.service';
import { Box, BoxSchema } from './schemas/box.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Box.name, schema: BoxSchema }])],
  providers: [BoxesResolver, BoxesService],
})
export class BoxesModule {}
