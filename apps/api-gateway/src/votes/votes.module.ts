import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { VotesController } from './controllers/votes.controller';
import { VotesService } from './services/votes.service';

@Module({
  imports: [
  ],
  controllers: [VotesController],
  providers: [
    {
      provide: 'VOTE_SERVICE',
      useFactory: (configService: ConfigService) => {
        // const mathSvcOptions = configService.get();
        return ClientProxyFactory.create({ transport: Transport.TCP, options: { port: 3002 } });
      },
      inject: [ConfigService],
    },
    VotesService
  ]
})
export class VotesModule {}
