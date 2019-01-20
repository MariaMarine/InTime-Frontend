import { IsNumber } from 'class-validator';

export class OffsetDTO {
  @IsNumber()
  days: number;

  @IsNumber()
  hours: number;
}
