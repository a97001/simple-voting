import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsDefined, Validate, ValidateNested } from "class-validator";
import { IsBefore } from "src/shared/custom-validators/is-before";
import xss from 'xss';

class CreateCampaignCandidateDto {
    @ApiProperty()
    @IsDefined()
    @Transform(s => xss(s))
    name: string;
}

export class CreateCampaignDto {
    @ApiProperty()
    @IsDefined()
    @Transform(s => xss(s))
    title: string;

    @ApiProperty()
    @IsDefined()
    @IsDate()
    @Validate(IsBefore, ['endDate'])
    @Type(() => Date)
    startAt: Date;

    @ApiProperty()
    @IsDefined()
    @IsDate()
    @Type(() => Date)
    endAt: Date;

    @ApiProperty({ type: [CreateCampaignCandidateDto] })
    @IsDefined()
    @ValidateNested()
    @Type(() => CreateCampaignCandidateDto)
    candidates: CreateCampaignCandidateDto[]
}
