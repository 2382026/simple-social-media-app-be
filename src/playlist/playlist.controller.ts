import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('playlists')
@UseGuards(AuthGuard)
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(+id);
  }

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }

  @Post(':playlistId/songs/:songId')
  addSong(
    @Param('playlistId') playlistId: string,
    @Param('songId') songId: string,
  ) {
    return this.playlistService.addSong(+playlistId, +songId);
  }

  @Delete(':playlistId/songs/:songId')
  removeSong(
    @Param('playlistId') playlistId: string,
    @Param('songId') songId: string,
  ) {
    return this.playlistService.removeSong(+playlistId, +songId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistService.remove(+id);
  }
}