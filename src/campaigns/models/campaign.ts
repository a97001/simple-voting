import { ObjectId } from "mongodb";
import { prop } from '@typegoose/typegoose';
import { Candidate } from "./candidate";

export class Campaign {
    _id: ObjectId;

    @prop({ required: true })
    title: String;

    @prop({ required: true })
    startAt: Date;

    @prop({ required: true })
    endAt: Date;

    @prop({ type: [Candidate], required: true })
    candidates: Candidate[]
}
