import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import * as path from 'path';

@Controller('upload')
export class UploadController {
  @Post('media')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (
          _req: any,
          file: { originalname: string },
          cb: (arg0: null, arg1: string) => void,
        ) => {
          const ext = path.extname(file.originalname);
          const filename = `${uuid()}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { path: `/uploads/${file.filename}` };
  }
}
