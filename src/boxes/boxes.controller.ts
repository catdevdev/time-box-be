import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, createWriteStream } from 'fs';
import { TransportSubstrateService } from 'src/warehouses/warehouseItSelf.service';
import { WarehousesService } from 'src/warehouses/warehouses.service';

import { diskStorage } from 'multer';
import { extname } from 'path';
import { BoxesService } from './boxes.service';

import { nanoid } from 'nanoid';
import { ObjectId } from 'mongoose';

@Controller('boxes')
export class BoxesController {
  constructor(private boxes: BoxesService) {} // private transportSubstrate: TransportSubstrateService, // private warehousesService: WarehousesService,

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname);
          console.log(cb);
          console.log(file);
          console.log(extname(file.originalname));
          const id = nanoid(50);
          cb(null, `${id}${fileExtName}`);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { boxId: string },
  ) {
    console.log(body.boxId);
    this.boxes.addImageIntoBox(body.boxId, file.filename);
  }
}
