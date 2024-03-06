import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuoteService } from './quote.service';
import { QuoteOutputDto } from "./dto/quote.output.dto";

@Controller('quote')
@ApiTags('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get(':input_asset/:output_asset')
  @ApiResponse({
    status: 200,
    type: QuoteOutputDto,
    description: "Get signature for Staking whitelist",
  })
  async getQuote(
    @Param('input_asset') inputAsset: string,
    @Param('output_asset') outputAsset: string,
    @Query('input_amount') inputAmount: number,
  ): Promise<QuoteOutputDto> {
    // Get the best quote
    const bestQuote = await this.quoteService.getBestQuote(
      inputAsset,
      outputAsset,
      inputAmount,
    );

    if (!bestQuote) {
      throw new BadRequestException('No quotes available')
    }

    return {
      outputAmount: bestQuote.price * inputAmount,
      source: bestQuote.source,
    };
  }
}
