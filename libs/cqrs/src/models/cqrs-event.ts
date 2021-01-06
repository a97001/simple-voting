import { Types, Schema } from 'mongoose';
import { prop, modelOptions, Severity } from '@typegoose/typegoose';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class CqrsEvent {
    @prop()
    createdAt: Date;

    @prop()
    name: string;

    @prop()
    aggregateId: Types.ObjectId;

    @prop()
    aggregateType: string;

    @prop({ type: Schema.Types.Mixed })
    content: any;
};