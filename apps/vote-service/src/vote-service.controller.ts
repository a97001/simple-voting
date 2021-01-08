import { Controller } from '@nestjs/common';
import { VoteServiceService } from './vote-service.service';

@Controller()
export class VoteServiceController {
  constructor(private readonly voteServiceService: VoteServiceService) {}
}
