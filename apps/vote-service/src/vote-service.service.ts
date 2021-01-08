import { Injectable } from '@nestjs/common';

@Injectable()
export class VoteServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
