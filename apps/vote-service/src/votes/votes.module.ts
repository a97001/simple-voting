import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { VotesController } from './controllers/votes.controller';
import { Vote } from './models/vote';
import { VotesRepository } from './repositories/votes.repository';
import { VotesService } from './services/votes.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: Vote,
        schemaOptions: { collection: 'votes', ...{ autoCreate: true } }
      }
    ]),
  ],
  controllers: [VotesController],
  providers: [VotesService, VotesRepository]
})
export class VotesModule {}
