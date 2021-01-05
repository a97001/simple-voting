import { Controller, Get } from '@nestjs/common';
import { VoteServiceService } from './vote-service.service';

@Controller()
export class VoteServiceController {
  constructor(private readonly voteServiceService: VoteServiceService) {}

  // @Get()
  // getHello(): string {
  //   return this.voteServiceService.getHello();
  // }
}
