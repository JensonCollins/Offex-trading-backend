import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuoteService } from './quote.service';

@Controller('quote')
@ApiTags('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get(':input_asset/:output_asset')
  async getQuote(
    @Param('input_asset') inputAsset: string,
    @Param('output_asset') outputAsset: string,
    @Query('input_amount') inputAmount: number,
  ) {
    // Get the best quote
    const bestQuote = await this.quoteService.getBestQuote(
      inputAsset,
      outputAsset,
      inputAmount,
    );

    if (!bestQuote) {
      return { message: 'No quotes received' };
    }

    return {
      inputAsset,
      outputAsset,
      inputAmount,
      outputAmount: bestQuote.price * inputAmount,
      source: bestQuote.source,
    };
  }
}
