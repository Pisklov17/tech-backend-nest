import {IsString} from "class-validator";
import {PartialType} from "@nestjs/swagger";

export class CreatePostDTO{
    @IsString()
    postName: string

    @IsString()
    image_url: string;

    @IsString()
    postMiniText:string;

    @IsString()
    postText: string;
}

export class UpdatePostDTO extends PartialType(CreatePostDTO){}


