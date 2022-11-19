import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/models/user.model";
import {Post} from "./models/post.model";

@Module({
  imports:[SequelizeModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
