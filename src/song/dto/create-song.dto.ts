import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  artist: string;

  @IsEnum(['Slay', 'Healing', 'Hype', 'Galau', 'Main Character', 'Throwback', 'Chill', 'Workout'])
  @ApiProperty({
    enum: ['Slay', 'Healing', 'Hype', 'Galau', 'Main Character', 'Throwback', 'Chill', 'Workout']
  })
  mood: string;
}