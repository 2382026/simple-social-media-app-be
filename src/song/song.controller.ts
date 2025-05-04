import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('songs')
@UseGuards(AuthGuard)
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get()
  findAll() {
    return this.songService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songService.findOne(+id);
  }

  @Get('mood/:mood')
  findByMood(@Param('mood') mood: string) {
    return this.songService.findByMood(mood);
  }

  @Post()
  create(@Body() createSongDto: CreateSongDto, @Request() req) {
    return this.songService.create(createSongDto, req.user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSongDto: CreateSongDto) {
    return this.songService.update(+id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songService.remove(+id);
  }
}