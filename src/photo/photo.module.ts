import { Module } from '@nestjs/common';
import { Photo } from './entity/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
})
export class PhotoModule {}
