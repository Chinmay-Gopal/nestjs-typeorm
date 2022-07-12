import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import AbstractEntity from '../../common/entity/abstract.entity';
import { Book } from '../../book/entity/book.entity';
import { Photo } from '../../photo/entity/photo.entity';
import { UserPreference } from './user-preference.entity';

@Entity('user')
export class User extends AbstractEntity {
  @Column({ nullable: false, name: 'email', unique: true })
  email: string;

  @Column({ nullable: false, name: 'name' })
  name: string;

  @OneToOne(() => UserPreference, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'preference_id' })
  preference: UserPreference;

  @OneToMany(() => Book, (book) => book.lentBy)
  books: Book[];

  @OneToMany(() => Photo, (photo) => photo.user, {
    cascade: true,
  })
  photos: Photo[];
}
