import { Injectable, Logger } from '@nestjs/common';

import { CreateUserDTO } from '../dto/request/create-user.dto';
import { UpdateUserDTO } from '../dto/request/update-user.dto';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private readonly logger: Logger = new Logger(UserService.name);

  /**
   * Service function to create user
   * @param {CreateUserDTO} createUserDetails - create user details
   * @returns {User} - created user
   */
  createUser(createUserDetails: CreateUserDTO): Promise<User> {
    return new Promise((resolve, reject) => {
      this.logger.log('Request to create user');
      this.userRepository
        .createUser(createUserDetails)
        .then((createdUser: User) => {
          this.logger.log('User created successfully');
          resolve(createdUser);
        })
        .catch((error) => {
          this.logger.error(`Error while creating user :: ${error.message}`);
          reject(error);
        });
    });
  }

  /**
   * Service function to find user
   * @param {string} userId - id of the user to be found
   * @returns {User} - found user
   */
  findUser(userId: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.logger.log('Request to find user');
      this.userRepository
        .findUser(userId)
        .then((foundUser: User) => {
          this.logger.log('User found successfully');
          resolve(foundUser);
        })
        .catch((error) => {
          this.logger.error(`Error while finding user :: ${error.message}`);
          reject(error);
        });
    });
  }

  /**
   * Service function to update user
   * @param {string} userId - id of the user to be updated
   * @param {UpdateUserDTO} updateUserDetails - update user details
   * @returns {User} - created user
   */
  updateUser(userId: string, updateUserDetails: UpdateUserDTO): Promise<User> {
    return new Promise((resolve, reject) => {
      this.logger.log('Request to update user');
      this.userRepository
        .updateUser(userId, updateUserDetails)
        .then((updatedUser: User) => {
          this.logger.log('User updated successfully');
          resolve(updatedUser);
        })
        .catch((error) => {
          this.logger.error(`Error while updating user :: ${error.message}`);
          reject(error);
        });
    });
  }

  /**
   * Service function to delete user
   * @param {string} userId - id of the user to be deleted
   * @returns {string}
   */
  deleteUser(userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.logger.log('Request to delete user');
      this.userRepository
        .deleteUser(userId)
        .then((message: string) => {
          this.logger.log('User deleted successfully');
          resolve(message);
        })
        .catch((error) => {
          this.logger.error(`Error while finding user :: ${error.message}`);
          reject(error);
        });
    });
  }
}
