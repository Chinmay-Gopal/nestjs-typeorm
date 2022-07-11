import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import AbstractEntity from '../../common/entity/abstract.entity';
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
}
