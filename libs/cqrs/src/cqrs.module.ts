import { Module } from '@nestjs/common';
import { KafkaModule } from 'nestjs-rdkafka';
import { TypegooseModule } from 'nestjs-typegoose';
import { CqrsService } from './cqrs.service';
import { CqrsEvent } from './models/cqrs-event';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: CqrsEvent, schemaOptions: { collection: 'cqrsEvents', timestamps: true, ...{ autoCreate: true } } }
    ]),
    KafkaModule
  ],
  providers: [CqrsService],
  exports: [CqrsService],
})
export class CqrsModule { }
