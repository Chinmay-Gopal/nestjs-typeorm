import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IPhoto } from '../../photo/interface/photo.interface';
import { CreateUserDTO } from '../dto/request/create-user.dto';
import { UpdateUserDTO } from '../dto/request/update-user.dto';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller({
  path: '/user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Controller function to create user
   * @endpoint - /user
   * @method - POST
   * @param {CreateUserDTO} createUserDetails - user details
   */
  @Post('/')
  createUser(@Body() createUserDetails: CreateUserDTO): Promise<User> {
    return new Promise((resolve, reject) => {
      this.userService
        .createUser(createUserDetails)
        .then((createdUser: User) => resolve(createdUser))
        .catch((error) =>
          reject(new InternalServerErrorException(error.message)),
        );
    });
  }

  /**
   * Controller function to find a user by id
   * @endpoint - /user/:userId
   * @method - GET
   */
  @Get('/:userId')
  findUserById(@Param('userId') userId: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.userService
        .findUser(userId)
        .then((foundUser: User) => resolve(foundUser))
        .catch((error) =>
          reject(new InternalServerErrorException(error.message)),
        );
    });
  }

  /**
   * Controller function to update a user by id
   * @endpoint - /user/:userId
   * @method - PATCH
   */
  @Patch('/:userId')
  updateUserById(
    @Param('userId') userId: string,
    @Body() updateUserDetails: UpdateUserDTO,
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      this.userService
        .updateUser(userId, updateUserDetails)
        .then((updatedUser: User) => resolve(updatedUser))
        .catch((error) =>
          reject(new InternalServerErrorException(error.message)),
        );
    });
  }

  /**
   * Controller function to delete a user by id
   * @endpoint - /user/:userId
   * @method - DELETE
   */
  @Delete('/:userId')
  deleteUserById(@Param('userId') userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.userService
        .deleteUser(userId)
        .then((message: string) => resolve(message))
        .catch((error) =>
          reject(new InternalServerErrorException(error.message)),
        );
    });
  }

  /**
   * Controller function to add photo(s) to a user
   * @endpoint - /user/:userId/photos/add
   * @method - PATCH
   */
  @Patch('/:userId/photos/add')
  addPhotos(
    @Param('userId') userId: string,
    @Body('photoDetails') photoDetails: IPhoto[],
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      console.log('photoDetails :: ', photoDetails);
      this.userService
        .addPhotos(userId, photoDetails)
        .then((updatedUser: User) => resolve(updatedUser))
        .catch((error) =>
          reject(new InternalServerErrorException(error.message)),
        );
    });
  }

  /**
   * Controller function to remove photo(s) to a user
   * @endpoint - /user/:userId/photos/add
   * @method - PATCH
   */
  @Patch('/:userId/photos/remove')
  removePhotos(
    @Param('userId') userId: string,
    @Body('photoIdsToBeRemoved') photoIdsToBeRemoved: string[],
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      this.userService
        .removePhotos(userId, photoIdsToBeRemoved)
        .then((updatedUser: User) => resolve(updatedUser))
        .catch((error) =>
          reject(new InternalServerErrorException(error.message)),
        );
    });
  }
}
