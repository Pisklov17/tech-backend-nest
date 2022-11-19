import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./models/user.model";
import * as bcrypt from 'bcrypt';
import {CreateUserDTO} from "./dto";


@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly UserRepository: typeof User) {}

    async hashPassword(password){
        return bcrypt.hash(password,10);
    }


    async findUserByEmail(email:string){
        return this.UserRepository.findOne({ where: {email: email} });
    }


    async createUser(dto: CreateUserDTO): Promise<CreateUserDTO>{
        dto.password = await this.hashPassword(dto.password);
        await this.UserRepository.create({
            firstName: dto.firstName,
            userName: dto.userName,
            email: dto.email,
            password: dto.password
        });

        return dto;
    }

    async publicUser(email:string){
        return this.UserRepository.findOne({
            where:{email},
            attributes:{exclude:['password']}
        });

    }

    findById(id: any) {
        return Promise.resolve(undefined);
    }
}