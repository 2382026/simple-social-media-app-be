import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './playlist.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { SongService } from '../song/song.service';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
    private songService: SongService,
  ) {}

  async findAll(): Promise<Playlist[]> {
    return this.playlistRepository.find({ relations: ['songs'] });
  }

  async findOne(id: number): Promise<Playlist> {
    const playlist = await this.playlistRepository.findOne({
      where: { id },
      relations: ['songs'],
    });
    if (!playlist) {
      throw new NotFoundException(`Playlist dengan ID ${id} tidak ditemukan`);
    }
    return playlist;
  }

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const playlist = this.playlistRepository.create({
      name: createPlaylistDto.name,
      mood: createPlaylistDto.mood,
    });

    if (createPlaylistDto.songIds) {
      const songs = await Promise.all(
        createPlaylistDto.songIds.map(id => this.songService.findOne(id))
      );
      playlist.songs = songs;
    }

    return this.playlistRepository.save(playlist);
  }

  async addSong(playlistId: number, songId: number): Promise<Playlist> {
    const playlist = await this.findOne(playlistId);
    const song = await this.songService.findOne(songId);
    
    if (!playlist.songs) {
      playlist.songs = [];
    }
    playlist.songs.push(song);
    
    return this.playlistRepository.save(playlist);
  }

  async removeSong(playlistId: number, songId: number): Promise<Playlist> {
    const playlist = await this.findOne(playlistId);
    playlist.songs = playlist.songs.filter(song => song.id !== songId);
    return this.playlistRepository.save(playlist);
  }

  async remove(id: number): Promise<void> {
    const playlist = await this.findOne(id);
    await this.playlistRepository.remove(playlist);
  }
}