import {Body, Controller, Delete, Patch, Req, UseGuards,} from '@nestjs/common';
import {UserService} from "./user.service";
import {updateUserDTO} from "./dto";
import {JwtAuthGuard} from "../../guards/jwt-guard";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Patch()
    updateUser(@Body() updateDTO: updateUserDTO,@Req() request){
        const id = request.user.id;
        return  this.userService.updateUser(id,updateDTO);

    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteUser(@Req() request){
        const id = request.user.id;
        return this.userService.deleteUser(id);
    }
}
