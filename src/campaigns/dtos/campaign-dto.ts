import { ApiResponseProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { ObjectId } from "mongodb";

class CampaignCandidateDto {
    @ApiResponseProperty({ type: String })
    _id: ObjectId;

    @ApiResponseProperty()
    name: string;

    @ApiResponseProperty()
    voteCnt: number;
}

export class CampaignDto {
    @ApiResponseProperty({ type: String })
    _id: ObjectId;

    @ApiResponseProperty()
    title: string;

    @ApiResponseProperty()
    startAt: Date;

    @ApiResponseProperty()
    endAt: Date;

    @ApiResponseProperty()
    updatedAt: Date;

    @ApiResponseProperty()
    createdAt: Date;

    @ApiResponseProperty({ type: [CampaignCandidateDto] })
    candidates: CampaignCandidateDto[]

    @ApiResponseProperty()
    totalVoteCnt: number;

    @Exclude()
    __v: number
}
