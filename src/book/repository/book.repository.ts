import { EntityRepository, FindOneOptions, Repository } from 'typeorm';
import { difference, map } from 'lodash';

import { Book } from '../entity/book.entity';
import { CreateBookDTO } from '../dto/request/create-book.dto';
import { Logger } from '@nestjs/common';
import { User } from '../../user/entity/user.entity';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  private readonly logger: Logger = new Logger(BookRepository.name);

  /**
   * Repository function to create a book
   * @param {CreateBookDTO} bookDetails - details of the book to be created
   * @returns {Book} - created book
   */
  createBook(bookDetails: CreateBookDTO): Promise<Book> {
    return new Promise((resolve, reject) => {
      this.logger.log('Creating Book');

      const book: Book = new Book();
      book.name = bookDetails.name;
      book.serialNumber = bookDetails.serialNumber;
      book.authors = bookDetails.authorIds.map((authorId: string) => {
        const author: User = new User();
        author.id = authorId;

        return author;
      });

      this.save(book)
        .then((createdBook: Book) => {
          this.logger.log('Book created successfully');
          resolve(createdBook);
        })
        .catch((error) => {
          this.logger.error(`Error while creating book :: ${error.message}`);
          reject(error);
        });
    });
  }

  /**
   * Repository function to find book by id
   * @param {string} bookId - id fo the book
   * @returns {Book} - found book
   */
  findBook(bookId: string): Promise<Book> {
    return new Promise((resolve, reject) => {
      this.logger.log(`Finding book (id)=(${bookId})`);
      const queryOptions: FindOneOptions = {
        relations: ['authors'],
      };

      this.findOneOrFail(bookId, queryOptions)
        .then((foundBook: Book) => {
          this.logger.log(`Book (id)=(${bookId}) found`);
          resolve(foundBook);
        })
        .catch((error) => {
          this.logger.error(`Error while finding book (id)=(${bookId})`);
          reject(error);
        });
    });
  }

  /**
   * Repository function to add authors to book
   * @param {string} bookId - id of the book
   * @param {string[]} authorIds - id fo the authors to be added
   */
  addAuthors(bookId: string, authorIds: string[]): Promise<Book> {
    return new Promise((resolve, reject) => {
      this.logger.log(`Adding authors to book (id)=(${authorIds.join()}`);
      this.findBook(bookId)
        .then((existingBook: Book) => {
          // push new author(s) to existing author(s)
          authorIds.forEach((authorId: string) => {
            const author: User = new User();
            author.id = authorId;

            existingBook.authors.push(author);
          });

          this.save(existingBook)
            .then((updatedBook: Book) => {
              this.logger.log('Added author(s) to book');
              resolve(updatedBook);
            })
            .catch((error) => {
              this.logger.error(
                `Error while adding author(s) :: ${error.message}`,
              );
              reject(error);
            });
        })
        .catch((error) => {
          this.logger.error(`Error while fetching book :: ${error.message}`);
          reject(error);
        });
    });
  }

  /**
   * Repository function to remove author(s) of a book
   * @param {string} bookId - id of the book
   * @param {string[]} authorIds - id of the author(s) to be removed
   */
  removeAuthors(bookId: string, authorIds: string[]): Promise<Book> {
    return new Promise((resolve, reject) => {
      this.logger.log('Removing author(s)');
      this.findBook(bookId)
        .then((existingBook: Book) => {
          const authorIds_: string[] = difference(
            map(existingBook.authors, 'id'),
            authorIds,
          );

          existingBook.authors = authorIds_.map((authorId: string) => {
            const author: User = new User();
            author.id = authorId;

            return author;
          });

          this.save(existingBook)
            .then((updatedBook: Book) => {
              this.logger.log('Remove author(s)');
              resolve(updatedBook);
            })
            .catch((error) => {
              this.logger.error(
                `Error while removing author(s) :: ${error.message}`,
              );
              reject(error);
            });
        })
        .catch((error) => {
          this.logger.error(`Error while fetching book :: ${error.message}`);
          reject(error);
        });
    });
  }

  /**
   * Repository function to delete a book
   * @param {string} bookId - id of the book to be deleted
   * @returns {string}
   */
  deleteBook(bookId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.findBook(bookId)
        .then((existingBook: Book) => {
          this.remove(existingBook)
            .then(() => {
              this.logger.log('Book deleted successfully');
              resolve('Book deleted successfully');
            })
            .catch((error) => {
              this.logger.error(
                `Error while deleting book :: ${error.message}`,
              );
              reject(error);
            });
        })
        .catch((error) => {
          this.logger.error(`Error while fetching book :: ${error.message}`);
          reject(error);
        });
    });
  }
}
