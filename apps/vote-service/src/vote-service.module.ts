import { Module } from '@nestjs/common';
import { VoteServiceController } from './vote-service.controller';
import { VoteServiceService } from './vote-service.service';

@Module({
  imports: [],
  controllers: [VoteServiceController],
  providers: [VoteServiceService],
})
export class VoteServiceModule {}
