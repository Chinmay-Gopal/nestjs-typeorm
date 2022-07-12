import { EntityRepository, FindOneOptions, Repository } from 'typeorm';
import { difference, map } from 'lodash';

import { CreateUserDTO } from '../dto/request/create-user.dto';
import { IPhoto } from '../../photo/interface/photo.interface';
import { Logger } from '@nestjs/common';
import { Photo } from '../../photo/entity/photo.entity';
import { UpdateUserDTO } from '../dto/request/update-user.dto';
import { User } from '../entity/user.entity';
import { UserPreference } from '../entity/user-preference.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private readonly logger: Logger = new Logger(UserRepository.name);

  /**
   * Repository function to create user
   * @param {CreateUserDTO} createUserDetails - user details
   * @returns {User} - created user
   */
  createUser(createUserDetails: CreateUserDTO): Promise<User> {
    return new Promise((resolve, reject) => {
      this.logger.log('Creating user');

      // user details
      const user: User = new User();
      user.email = createUserDetails.email;
      user.name = createUserDetails.name;

      // user preference
      const userPreference: UserPreference = new UserPreference();
      userPreference.language = createUserDetails.language;
      userPreference.secondaryEmail = createUserDetails.secondaryEmail;

      // assign user preference to user
      user.preference = userPreference;

      // assign photos
      user.photos = createUserDetails.photos.map((photo_: IPhoto) => {
        const photo: Photo = new Photo();
        photo.name = photo_.name;
        photo.url = photo_.url;

        return photo;
      });

      this.save(user)
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
   * Repository function to find user by id
   * @param {string} userId - id of the user to be found
   * @returns {User} = found user
   */
  findUser(userId: string): Promise<User> {
    this.logger.log(`Finding user (id)=(${userId})`);
    return new Promise((resolve, reject) => {
      const queryOptions: FindOneOptions = {
        relations: ['preference', 'photos', 'books'],
      };

      this.findOneOrFail(userId, queryOptions)
        .then((foundUser: User) => {
          this.logger.log(`User (id)=(${userId}) found `);
          resolve(foundUser);
        })
        .catch((error) => {
          this.logger.error(`Error while finding user (id)=(${userId})`);
          reject(error);
        });
    });
  }

  /**
   * Repository function to update user details
   * @param {string} userId - id of the user
   * @param {UpdateUserDTO} updateUserDetails - update details
   * @returns {User} - updated user
   */
  updateUser(userId: string, updateUserDetails: UpdateUserDTO): Promise<User> {
    return new Promise((resolve, reject) => {
      this.findUser(userId)
        .then((existingUser: User) => {
          const user = existingUser;

          // update name
          if (updateUserDetails.name) user.name = updateUserDetails.name;

          // update email
          if (updateUserDetails.email) user.email = updateUserDetails.email;

          // update language
          if (updateUserDetails.language)
            user.preference.language = updateUserDetails.language;

          // update secondary email
          if (updateUserDetails.secondaryEmail)
            user.preference.secondaryEmail = updateUserDetails.secondaryEmail;

          this.save(user)
            .then((updatedUser) => {
              this.logger.log('User details updated');
              resolve(updatedUser);
            })
            .catch((err) => {
              this.logger.error(
                `Error while updating user details :: ${err.message}`,
              );
              reject(err);
            });
        })
        .catch((error) => {
          this.logger.error(`Error while finding user :: ${error.message}`);
          reject(error);
        });
    });
  }

  /**
   * Repository function to delete a user by id
   * @param {string} userId - id of the user to be found
   * @returns {string}
   */
  deleteUser(userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.logger.log('Deleting user');

      this.findUser(userId)
        .then((foundUser) => {
          this.remove(foundUser)
            .then(() => {
              this.logger.log('User deleted successfully');
              resolve('User deleted successfully');
            })
            .catch((error) => {
              this.logger.error(
                `Error while deleting user :: ${error.message}`,
              );
              reject(error);
            });
        })
        .catch((error) => {
          this.logger.error(`Error while finding user :: ${error.message}`);
          reject(error);
        });
    });
  }

  /**
   * Repository function to remove photo(s) of a user
   * @param {string} userId - id of the user whose photos are removed
   * @param {string[]} photoIdsToBeRemoved - id of the photos to be removed
   * @returns {User} - updated user
   */
  removePhotos(userId: string, photoIdsToBeRemoved: string[]): Promise<User> {
    return new Promise((resolve, reject) => {
      this.logger.log('Removing photo(s) of a user');
      this.findUser(userId)
        .then((existingUser: User) => {
          // get A - B, to remove the requested photos and store the rest of the photos
          const photoIds = difference(
            map(existingUser.photos, 'id'),
            photoIdsToBeRemoved,
          );

          existingUser.photos = photoIds.map((photoId: string) => {
            const photo = new Photo();
            photo.id = photoId;

            return photo;
          });

          this.save(existingUser)
            .then((updatedUser: User) => {
              this.logger.log('User Photo(s) removed');
              resolve(updatedUser);
            })
            .catch((error) => {
              this.logger.error(
                `Error while removing user photo(s) :: ${error.message}`,
              );
              reject(error);
            });
        })
        .catch((error) => {
          this.logger.error(`Error while fetching user :: ${error.message}`);
          reject(error);
        });
    });
  }

  /**
   * Repository function to add photo(s) to user
   * @param {string} userId - id of the user
   * @param {IPhoto[]} photoDetails - details of the photo(s)
   * @returns {User} - updated user
   */
  addPhotos(userId: string, photoDetails: IPhoto[]): Promise<User> {
    return new Promise((resolve, reject) => {
      this.logger.log('Adding photo(s) to user');
      this.findUser(userId)
        .then((existingUser: User) => {
          // push photo(s) to existing collection
          photoDetails.forEach((photo_: IPhoto) => {
            const photo: Photo = new Photo();
            photo.name = photo_.name;
            photo.url = photo_.url;

            existingUser.photos.push(photo);
          });

          this.save(existingUser)
            .then((updatedUser: User) => {
              this.logger.log('User Photo(s) removed');
              resolve(updatedUser);
            })
            .catch((error) => {
              this.logger.error(
                `Error while adding photo(s) :: ${error.message}`,
              );
              reject(error);
            });
        })
        .catch((error) => {
          this.logger.error(`Error while fetching user :: ${error.message}`);
          reject(error);
        });
    });
  }
}
