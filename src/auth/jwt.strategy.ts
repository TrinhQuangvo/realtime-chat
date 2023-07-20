import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common'; 
import { Request } from 'express';
import { UserService } from 'src/user/service/user/user.service';

interface TokenPayload {
    id: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Authentication;
            }]),
            secretOrKey: "SECRET"
        });
    }

    async validate(payload: TokenPayload) {
        console.log(payload)
        return this.userService.getUserById(payload.id);
    }
}