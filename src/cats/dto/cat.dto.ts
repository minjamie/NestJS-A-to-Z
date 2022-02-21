import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '1234234',
    description: 'id',
  })
  id: string;
}
