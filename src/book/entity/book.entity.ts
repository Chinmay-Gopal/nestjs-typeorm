import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import AbstractEntity from '../../common/entity/abstract.entity';
import { User } from '../../user/entity/user.entity';

@Entity('book')
export class Book extends AbstractEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true, name: 'serial_number' })
  serialNumber: string;

  @ManyToMany(() => User, (user) => user.books)
  @JoinTable({ name: 'book_authors' })
  authors: User[];
}
