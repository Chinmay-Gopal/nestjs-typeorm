import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBookDTO } from '../dto/request/create-book.dto';
import { Book } from '../entity/book.entity';
import { BookService } from '../service/book.service';

@Controller({
  path: '/book',
})
export class BookController {
  constructor(private readonly bookService: BookService) {}

  /**
   * Controller function to create book
   * @endpoint - /book
   * @method - POST
   * @param {CreateBookDTO} bookDetails - book details
   */
  @Post('/')
  createBook(@Body() bookDetails: CreateBookDTO): Promise<Book> {
    return new Promise((resolve, reject) => {
      this.bookService
        .createBook(bookDetails)
        .then((createdBook: Book) => resolve(createdBook))
        .catch((error) =>
          reject(new InternalServerErrorException(error.message)),
        );
    });
  }

  /**
   * Controller function to find a book by id
   * @endpoint - /book/:bookId
   * @method - GET
   */
  @Get('/:book')
  findBookById(@Param('bookId') bookId: string): Promise<Book> {
    return new Promise((resolve, reject) => {
      this.bookService
        .findBook(bookId)
        .then((foundBook: Book) => resolve(foundBook))
        .catch((error) =>
          reject(new InternalServerErrorException(error.message)),
        );
    });
  }

  /**
   * Controller function to add authors to a book
   * @endpoint - /book/:bookId/authors/add
   * @method - PATCH
   */
  @Patch('/:book/authors/add')
  addAuthors(
    @Param('bookId') bookId: string,
    @Body('authorIds') authorIds: string[],
  ): Promise<Book> {
    return new Promise((resolve, reject) => {
      this.bookService
        .addAuthors(bookId, authorIds)
        .then((updatedBook: Book) => resolve(updatedBook))
        .catch((error) =>
          reject(new InternalServerErrorException(error.message)),
        );
    });
  }

  /**
   * Controller function to remove authors of a book
   * @endpoint - /book/:bookId/authors/remove
   * @method - PATCH
   */
  @Patch('/:book/authors/remove')
  removeAuthors(
    @Param('bookId') bookId: string,
    @Body('authorIds') authorIds: string[],
  ): Promise<Book> {
    return new Promise((resolve, reject) => {
      this.bookService
        .removeAuthors(bookId, authorIds)
        .then((updatedBook: Book) => resolve(updatedBook))
        .catch((error) =>
          reject(new InternalServerErrorException(error.message)),
        );
    });
  }

  /**
   * Controller function to delete a book by id
   * @endpoint - /book/:bookId
   * @method - DELETE
   */
  @Get('/:book')
  deleteBook(@Param('bookId') bookId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.bookService
        .deleteBook(bookId)
        .then((message: string) => resolve(message))
        .catch((error) =>
          reject(new InternalServerErrorException(error.message)),
        );
    });
  }
}
