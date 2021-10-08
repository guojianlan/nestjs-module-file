import { IFileFactory } from './types';
export interface IFileFactorOption {
  domain: () => string;
}
export class FileFactor implements IFileFactory {
  domain: () => string;
  constructor(options: IFileFactorOption) {
    this.domain = options.domain;
  }
  async saveFile(file: Express.Multer.File & { md5: string }) {
    return {
      path: file.path.replace(/^\//, ''),
      size: file.size,
      md5: file.md5,
    };
  }
}
