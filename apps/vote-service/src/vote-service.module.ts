import { Module } from '@nestjs/common';
import { VoteServiceController } from './vote-service.controller';
import { VoteServiceService } from './vote-service.service';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [VotesModule],
  controllers: [VoteServiceController],
  providers: [VoteServiceService],
})
export class VoteServiceModule {}
