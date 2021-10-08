import { AbstractTypeEntity } from '@guojian/nestjs-abstract-module';
import { Column, Entity } from 'typeorm';

@Entity('file')
export class FileEntity extends AbstractTypeEntity {
  @Column({
    length: 1000,
  })
  object_name: string;

  @Column({
    default: 0,
  })
  size: number;
}
