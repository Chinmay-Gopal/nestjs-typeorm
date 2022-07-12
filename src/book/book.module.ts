import { BookController } from './controller/book.controller';
import { BookRepository } from './repository/book.repository';
import { BookService } from './service/book.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
