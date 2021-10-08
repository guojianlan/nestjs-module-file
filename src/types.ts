import { Request, Response } from 'express';
import { CustomDiskStorage } from './global.var';
import { ExecutionContext } from '@nestjs/common';
export type FileWarpMd5 = Express.Multer.File & { md5: string };
export interface IFileFactory {
  domain: () => string;
  saveFile: (
    file: FileWarpMd5,
    req: Request,
    res: Response,
  ) => Promise<{
    path: string;
    size: number;
    md5: string;
  }>;
}
export interface IFileStorageInstall {
  install: CustomDiskStorage;
}
export interface IGuardStore {
  inject: (context: ExecutionContext) => Promise<boolean>;
}
export interface Param {
  controllers: any[];
  providers: any[];
  imports: any[];
  inject: any[];
  destination?: string;
  useFactory: (
    ...args: [IFileStorageInstall, IGuardStore, ...any[]]
  ) => Promise<IFileFactory>;
}
