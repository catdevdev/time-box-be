import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, createWriteStream } from 'fs';
import { TransportSubstrateService } from 'src/warehouses/transportSubstrate.service';
import { WarehousesService } from 'src/warehouses/warehouses.service';

import { diskStorage } from 'multer';
import { extname } from 'path';
import { BoxesService } from './boxes.service';

import { nanoid } from 'nanoid';

@Controller('boxes')
export class BoxesController {
  constructor(private boxes: BoxesService) {} // private transportSubstrate: TransportSubstrateService, // private warehousesService: WarehousesService,

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const id = nanoid(3);
          cb(
            null,
            `${id}${extname(file.originalname)}
          `,
          );
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() boxId: string) {
    this.boxes.addImageIntoBox(boxId, file.filename);
  }
}
