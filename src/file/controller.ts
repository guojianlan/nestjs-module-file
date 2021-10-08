import { WrapController } from '@guojian/nestjs-abstract-module';
import { FileEntity } from './entity';
import { FileService } from './service';
import {
  Controller,
  Post,
  Req,
  Res,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { FileWarpMd5 } from '../types';
import { RunFnGuard } from '../runFn';
const CrudController = WrapController({
  model: FileEntity,
});
@Controller('file')
export class FileController extends CrudController {
  constructor(readonly service: FileService) {
    super(service);
  }

  @Post('uploadByFormData')
  @UseGuards(RunFnGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: FileWarpMd5,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // 获取临时目录的文件上传
    const result = await this.service.uploadObject(file, req, res);
    return result;
  }

  @Post('uploadByBinary')
  async uploadByBinary(
    @Req() req: Request,
    @Body() body: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const result = await this.service.uploadByBinary(req, res);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
