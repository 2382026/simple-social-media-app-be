import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Song]),
    JwtModule,
    ConfigModule
  ],
  controllers: [SongController],
  providers: [SongService],
  exports: [SongService],
})
export class SongModule {}