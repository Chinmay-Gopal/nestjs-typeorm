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
        .then((createdUser: User) => resolve(createdUser))
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
        .then((createdUser: User) => resolve(createdUser))
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
}
