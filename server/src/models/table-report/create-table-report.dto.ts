import { IsString, IsNumber } from 'class-validator';
import { OffsetDTO } from './offset.dto';

export class CreateTableReportDTO {
  @IsString()
  name: string;

  @IsNumber()
  period: number;

  @IsNumber()
  offset?: OffsetDTO;

  deviceNames: string[];
}
