import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { readdirSync, readFileSync } from 'fs';
import { parse as envParse } from 'dotenv';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { CampaignsModule } from './campaigns/campaigns.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [
    // ClientsModule.register([
    //   { name: 'CAMPAIGN_SERVICE', transport: Transport.TCP, options: { port: 3001 } },
    //   { name: 'VOTE_SERVICE', transport: Transport.TCP, options: { port: 3002 } },
    // ]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => envParse(readdirSync('env').map(path => readFileSync(`env/${path}`, 'utf8')).join('\n'))]
    }),
    CampaignsModule,
    VotesModule
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule { }
