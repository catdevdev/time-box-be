import { Module } from '@nestjs/common';
import { BoxesResolver } from './boxes.resolver';
import { BoxesService } from './boxes.service';

@Module({
  providers: [BoxesResolver, BoxesService]
})
export class BoxesModule {}
