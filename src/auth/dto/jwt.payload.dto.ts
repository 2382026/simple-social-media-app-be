import { ApiProperty } from '@nestjs/swagger';

export class JwtPayloadDto {
  @ApiProperty()
  sub: number;

  @ApiProperty()
  email: string;
}