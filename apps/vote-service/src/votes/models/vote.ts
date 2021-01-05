import { modelOptions, prop } from "@typegoose/typegoose";
import { ObjectId } from 'mongodb';

@modelOptions({ schemaOptions: { versionKey: false } })
export class Vote {
    _id: ObjectId;

    @prop({ required: true })
    campaignId: ObjectId;

    @prop({ required: true })
    candidatesId: ObjectId;

    @prop({ required: true, default: Date.now() })
    createdAt: Date;

    @prop({ required: true })
    hkid: string;
}