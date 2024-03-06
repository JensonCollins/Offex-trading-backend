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

    if (parsedPayload.inputAsset === "ETH" && parsedPayload.outputAsset === "DAI") {
      return {
        event: 'quotes',
        data: this.getRandomNumber(3600, 3800),
      };
    } else if (parsedPayload.inputAsset === "DAI" && parsedPayload.outputAsset === "ETH") {
      return {
        event: 'quotes',
        data: this.getRandomNumber(25, 35) / 100000,
      };
    } else {
      return {
        event: 'quotes',
        data: this.getRandomNumber(101, 105) / 100,
      };
    }
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
