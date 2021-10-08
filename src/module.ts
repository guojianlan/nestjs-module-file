import { DynamicModule, Module } from '@nestjs/common';
import { FileController, FileEntity, FileService } from './file';
import { MulterModule } from '@nestjs/platform-express';
import {
  CustomDiskStorage,
  FILE_MODULE_INIT,
  FILE_MODULE_PARAM,
} from './global.var';
import { IFileStorageInstall, Param } from './types';
import { GuardStore } from './runFn';
export const FileStorageInstall: IFileStorageInstall = {
  install: undefined,
};
@Module({})
export class FileModule {
  static async forRootAsync(param: Param): Promise<DynamicModule> {
    return {
      module: FileModule,
      imports: [
        ...(param && (param.imports || [])),
        MulterModule.registerAsync({
          useFactory: () => {
            FileStorageInstall.install = new CustomDiskStorage({
              destination: param.destination || 'upload',
            });
            return {
              storage: FileStorageInstall.install,
            };
          },
        }),
      ],
      controllers: [...(param && (param.controllers || []))],
      providers: [
        {
          provide: FILE_MODULE_PARAM,
          useValue: param,
        },
        {
          provide: FILE_MODULE_INIT,
          useFactory: async (...args) => {
            return await param.useFactory.apply(this, [
              FileStorageInstall,
              GuardStore,
              ...args,
            ]);
          },
          inject: [...(param && (param.inject || []))],
        },
        ...(param && (param.providers || [])),
      ],
      exports: [
        ...(param && (param.providers || [])),
        ...(param && (param.imports || [])),
      ],
    };
  }
}

export const FileBaseModule = {
  controllers: [FileController],
  providers: [FileService],
  entities: [FileEntity],
};
