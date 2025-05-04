import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  artist: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsString()
  @IsOptional()
  mood?: string;
}