import { index, modelOptions, prop } from "@typegoose/typegoose";
import { ObjectId } from 'mongodb';
import { VoteDto } from "../dtos/vote-dto";

@modelOptions({ schemaOptions: { versionKey: false } })
@index({ campaignId: 1, hkid: 1 }, { unique: true })
export class Vote {
    _id: ObjectId;

    @prop({ required: true })
    campaignId: ObjectId;

    @prop({ required: true })
    candidateId: ObjectId;

    @prop({ required: true, default: Date.now() })
    createdAt: Date;

    @prop({ required: true })
    hkid: string;

    public toDto(): VoteDto {
        return {
            campaignId: this.campaignId.toHexString(),
            candidateId: this.campaignId.toHexString(),
            createdAt: this.createdAt
        };
    }
}