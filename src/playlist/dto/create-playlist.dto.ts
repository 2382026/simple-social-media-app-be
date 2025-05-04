import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  name: string;

  @IsString()
  mood: string;

  @IsArray()
  @IsOptional()
  songIds?: number[];
}