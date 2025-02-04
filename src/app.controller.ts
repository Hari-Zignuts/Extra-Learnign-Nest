import {
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';

const storage = diskStorage({
  destination: './uploads/', // Ensure this folder exists
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file', { storage }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { message: 'File uploaded successfully', file: file.filename };
  }

  @Post('upload-image-validate')
  @UseInterceptors(FileInterceptor('file', { storage }))
  uploadFileWithValidate(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'png' })
        .addMaxSizeValidator({ maxSize: 1024 * 1024 }) // 1MB
        .build(),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return { message: 'File uploaded successfully', file: file.filename };
  }

  @Get('set-cookie')
  setCookie(@Res({ passthrough: true }) res: Response) {
    res.cookie('token', '123456789');
    return { message: 'Cookie set successfully' };
  }

  @Get('get-cookie')
  getCookie(@Req() req: Request) {
    const token: unknown = req.cookies['token'];
    return { message: 'Cookie retrieved successfully', token };
  }
}
