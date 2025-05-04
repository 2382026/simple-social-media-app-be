import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Playlist } from '../playlist/playlist.entity';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column({
    type: 'enum',
    enum: ['Slay', 'Healing', 'Hype', 'Galau', 'Main Character', 'Throwback', 'Chill', 'Workout']
  })
  mood: string;

  @ManyToOne(() => User, user => user.songs)
  user: User;

  @ManyToMany(() => Playlist, playlist => playlist.songs)
  playlists: Playlist[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}