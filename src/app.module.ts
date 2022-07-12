import { BookModule } from './book/book.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { PhotoModule } from './photo/photo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, UserModule, PhotoModule, BookModule],
})
export class AppModule {}
