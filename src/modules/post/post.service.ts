import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./models/post.model";
import {CreatePostDTO, UpdatePostDTO} from "./dto";

@Injectable()
export class PostService {

    constructor(@InjectModel(Post)private readonly PostRepository:typeof Post){}

    async createPost(dto: CreatePostDTO): Promise<CreatePostDTO>{
        await this.PostRepository.create({
            postName: dto.postName,
            image_url: dto.image_url,
            postMiniText: dto.postMiniText,
            postText: dto.postText
        });

        return dto;
    }

    async updatePost(dto: UpdatePostDTO,id:number): Promise<UpdatePostDTO>{
        await this.PostRepository.update(dto,{where:{id}});
        return await this.findOne(id);
    }

    async findOne(id: number) {
        return await this.PostRepository.findByPk(id,{include: {all:true} });
    }

    async deletePost(id:number){
        return await this.PostRepository.destroy({where:{id}});
    }

    async findAll(){
        return await this.PostRepository.findAll();
    }
}
