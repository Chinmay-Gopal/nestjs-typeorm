import { Book } from '../entity/book.entity';
import { BookRepository } from '../repository/book.repository';
import { CreateBookDTO } from '../dto/request/create-book.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  /**
   * Service function to create a book
   * @param {CreateBookDTO} bookDetails - details of the book to be created
   * @returns {Book} - created book
   */
  createBook(bookDetails: CreateBookDTO): Promise<Book> {
    return new Promise((resolve, reject) => {
      this.bookRepository
        .createBook(bookDetails)
        .then((createdBook: Book) => resolve(createdBook))
        .catch((error) => reject(error));
    });
  }

  /**
   * Service function to find a book
   * @param {string} bookId - id of the book to find
   * @returns {Book} - found book
   */
  findBook(bookId: string): Promise<Book> {
    return new Promise((resolve, reject) => {
      this.bookRepository
        .findBook(bookId)
        .then((foundBook: Book) => resolve(foundBook))
        .catch((error) => reject(error));
    });
  }

  /**
   * Service function to add authors to a book
   * @param {string} bookId - id of the book
   * @param {string[]} authorIds - id of the authors to be added
   * @returns {Book} - updated book
   */
  addAuthors(bookId: string, authorIds: string[]): Promise<Book> {
    return new Promise((resolve, reject) => {
      this.bookRepository
        .addAuthors(bookId, authorIds)
        .then((updatedBook: Book) => resolve(updatedBook))
        .catch((error) => reject(error));
    });
  }

  /**
   * Service function to remove authors ofo a book
   * @param {string} bookId - id of the book
   * @param {string[]} authorIds - id of the authors to be removed
   * @returns {Book} - updated book
   */
  removeAuthors(bookId: string, authorIds: string[]): Promise<Book> {
    return new Promise((resolve, reject) => {
      this.bookRepository
        .removeAuthors(bookId, authorIds)
        .then((updatedBook: Book) => resolve(updatedBook))
        .catch((error) => reject(error));
    });
  }

  /**
   * service function to delete a book
   * @param {string} bookId - id of the book to be deleted
   */
  deleteBook(bookId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.bookRepository
        .deleteBook(bookId)
        .then((message: string) => resolve(message))
        .catch((error) => reject(error));
    });
  }
}
