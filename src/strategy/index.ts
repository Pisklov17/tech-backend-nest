import {PassportStrategy} from "@nestjs/passport";
import {Strategy,ExtractJwt} from "passport-jwt";
import {ConfigService} from '@nestjs/config';
import {Injectable} from "@nestjs/common";
import {User} from "../modules/user/models/user.model";
import {UserService} from "../modules/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService,
                private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('secret_jwt')
        });

    }

    async validate({id}: Pick<User, 'id'>) {
        return await this.userService.findById(id);

    }
}