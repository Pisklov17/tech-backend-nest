import {IsString} from 'class-validator';
import {ApiProperty, PartialType} from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    userName:string;

    @ApiProperty()
    @IsString()
    email:string;

    @ApiProperty()
    @IsString()
    password: string;
}
export class updateUserDTO extends PartialType(CreateUserDTO){}

