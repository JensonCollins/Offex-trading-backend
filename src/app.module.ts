import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuoteController } from './quote/quote.controller';
import { QuoteService } from './quote/quote.service';
import { HealthModule } from './health/health.module';
import { QuoteGateway } from './quote/quote.gateway';

@Module({
  imports: [ConfigModule.forRoot(), HealthModule],
  controllers: [QuoteController],
  providers: [QuoteService, QuoteGateway],
})
export class AppModule {}
