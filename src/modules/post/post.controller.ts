import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {PostService} from "./post.service";
import {CreatePostDTO, UpdatePostDTO} from "./dto";
import {PostModule} from "./post.module";
import {JwtAuthGuard} from "../../guards/jwt-guard";

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create-post')
    createPosts(@Body()dto:CreatePostDTO){
        return this.postService.createPost(dto);
    }

    @Post(':id')
    findOne(@Param('id')id:string){
        return this.postService.findOne(+id);
    }

    @Get('find-all')
    findAll(){
        return this.postService.findAll();
    }

    @Patch(':id')
    updatePost(
        @Param('id') id: string,
        @Body() dto: UpdatePostDTO
    ): Promise<PostModule>{
        return this.postService.updatePost(dto, +id);
    }

    @Delete(':id')
    deletePost(@Param('id') id: string){
        return this.postService.deletePost(+id);
    }

}
