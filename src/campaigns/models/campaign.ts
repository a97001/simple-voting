import { ObjectId } from "mongodb";
import { prop } from '@typegoose/typegoose';

class CampaignCandidate {
    _id: ObjectId;

    @prop({ required: true })
    name: string;

    @prop({ default: 0 })
    voteCnt: number = 0;
}

export class Campaign {
    _id: ObjectId;

    @prop({ required: true })
    title: string;

    @prop({ required: true })
    startAt: Date;

    @prop({ required: true })
    endAt: Date;

    @prop({ type: [CampaignCandidate], required: true })
    candidates: CampaignCandidate[]
}
