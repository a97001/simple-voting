import { ApiResponseProperty } from "@nestjs/swagger";
import { CampaignDto } from "./campaign-dto";
import { ListDto } from "./list-dto";

export class CampaignListDto extends ListDto {
    @ApiResponseProperty({ type: [CampaignDto] })
    docs: CampaignDto[]
}
