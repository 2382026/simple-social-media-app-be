import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { User } from '../user/user.entity';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}

  async findAll(): Promise<Song[]> {
    return this.songRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songRepository.findOne({ 
      where: { id },
      relations: ['user']
    });
    if (!song) {
      throw new NotFoundException(`Lagu dengan ID ${id} tidak ditemukan`);
    }
    return song;
  }

  async findByMood(mood: string): Promise<Song[]> {
    return this.songRepository.find({
      where: { mood },
      relations: ['user']
    });
  }

  async create(createSongDto: CreateSongDto, user: User): Promise<Song> {
    const song = this.songRepository.create({
      ...createSongDto,
      user,
    });
    return this.songRepository.save(song);
  }

  async update(id: number, updateSongDto: CreateSongDto): Promise<Song> {
    const song = await this.findOne(id);
    Object.assign(song, updateSongDto);
    return this.songRepository.save(song);
  }

  async remove(id: number): Promise<void> {
    const song = await this.findOne(id);
    await this.songRepository.remove(song);
  }
}