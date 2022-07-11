import { Column, Entity, OneToOne } from 'typeorm';

import AbstractEntity from '../../common/entity/abstract.entity';
import { Language } from '../../common/enum/language.enum';
import { User } from './user.entity';

@Entity('user-preference')
export class UserPreference extends AbstractEntity {
  @Column({
    nullable: false,
    type: 'enum',
    enum: Language,
    default: Language.ENGLISH,
  })
  language: Language;

  @Column({
    name: 'secondary_name',
    nullable: true,
    default: null,
  })
  secondaryEmail: string;
}
