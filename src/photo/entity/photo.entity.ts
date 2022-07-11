import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import AbstractEntity from '../../common/entity/abstract.entity';
import { User } from '../../user/entity/user.entity';

@Entity('photo')
export class Photo extends AbstractEntity {
  @Column({ nullable: true, default: null })
  url: string;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => User, (user) => user.photos, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
