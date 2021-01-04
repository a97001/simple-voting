import { ApiResponseProperty } from "@nestjs/swagger";
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

    @ApiResponseProperty({ type: [CampaignCandidateDto] })
    candidates: CampaignCandidateDto[]
}
