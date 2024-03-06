import { ApiProperty } from "@nestjs/swagger";

export class QuoteOutputDto {
  @ApiProperty()
  outputAmount: number;

  @ApiProperty()
  source: string;
}