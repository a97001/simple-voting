import { ApiResponseProperty } from "@nestjs/swagger";

export abstract class ListDto {
    @ApiResponseProperty()
    docs: any;

    @ApiResponseProperty()
    totalDocs: number;

    @ApiResponseProperty()
    limit: number;

    @ApiResponseProperty()
    page?: number;

    @ApiResponseProperty()
    totalPages: number;

    @ApiResponseProperty()
    nextPage?: number | null;

    @ApiResponseProperty()
    prevPage?: number | null;

    @ApiResponseProperty()
    pagingCounter: number;

    @ApiResponseProperty()
    hasPrevPage: boolean;

    @ApiResponseProperty()
    hasNextPage: boolean;
}