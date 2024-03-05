import { Injectable } from '@nestjs/common';
import { io } from 'socket.io-client';

@Injectable()
export class QuoteService {
  async getBestQuote(
    inputAsset: string,
    outputAsset: string,
    inputAmount: number,
  ) {
    const priceSources = [
      { name: 'Uniswap V3', url: 'ws://localhost:3008' },
      { name: 'Sushiswap', url: 'ws://localhost:3008' },
      { name: '1 inch', url: 'ws://localhost:3008' },
    ];

    const offersPromises = priceSources.map(async (source) => {
      return new Promise<{ price: number; source: string }>((resolve, _) => {
        const socket = io(source.url);
        socket.on('connect', () => {
          socket.emit(
            'quotes',
            JSON.stringify({
              source: source.name,
              inputAsset,
              outputAsset,
              inputAmount,
            }),
          );
        });
        socket.on('quotes', (data) => {
          const price = parseFloat(data.toString());

          resolve({
            price,
            source: source.name,
          });
          socket.close();
        });
        socket.on('error', (err) => {
          console.error(
            `Error fetching offer from ${source.name}: ${err.message}`,
          );
          resolve({
            price: null,
            source: source.name,
          });
          socket.close();
        });
      });
    });

    // Wait for all offer promises to resolve
    const offers = await Promise.all(offersPromises);

    // Filter out null values and get the maximum offer
    const validOffers = offers.filter((offer) => offer.price !== null);

    if (validOffers.length === 0) {
      return null;
    }
    // get offer with max offer value
    return validOffers.reduce((max, current) =>
      current.price > max.price ? current : max,
    );
  }
}
