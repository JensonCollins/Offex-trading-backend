import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Payload } from './quote.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class QuoteGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('quotes')
  handleQuotes(@MessageBody() payload: any): WsResponse<unknown> {
    const parsedPayload: Payload = JSON.parse(payload);

    let price = 1000;
    switch (parsedPayload.source) {
      case 'Uniswap V3':
        price = 1100;
        break;

      case 'Sushiswap':
        price = 1200;
        break;

      case '1 inch':
        price = 1300;
        break;
    }

    return {
      event: 'quotes',
      data: price,
    };
  }
}
