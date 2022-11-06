// create a typeorm model for the discord guild

import { PrimaryGeneratedColumn, Column, BaseEntity, Entity } from 'typeorm';

@Entity()
class DiscordGuild extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  guildId!: string;

  @Column()
  name!: string;

  @Column()
  createdAt!: Date;

  @Column()
  pupperChannelId!: string;
}

export default DiscordGuild;
