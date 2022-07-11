import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
export const ormConfig: TypeOrmModuleOptions = {
  /**
   * Database type.
   */
  type: 'postgres',

  /**
   * Logging options.
   */
  logging: true,

  /**
   * Indicates if database schema should be auto created on every application launch.
   */
  synchronize: true,

  /**
   * Entities to be loaded for this connection.
   */
  entities: [join(__dirname, 'src/**/*.entity{.ts,.js}')],

  /**
   * Connection name. If connection name is not given then it will be called "default".
   * Different connections must have different names.
   */
  database: 'nestjs-typeorm',

  /**
   * Database host.
   */
  host: 'localhost',

  /**
   * Database host port.
   */
  port: 5432,

  /**
   * Database username.
   */
  username: 'postgres',

  /**
   * Database password.
   */
  password: 'M@y20!999',
};
