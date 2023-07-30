import { HttpException, HttpStatus, Injectable, BadRequestException, Res, Param, } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { UserService } from 'src/Modules/user/service/user/user.service';

interface iLogin {
    email: string
    password: string
}


interface TokenPayload {
    userId: number;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly _userService: UserService,
        private readonly _jwtService: JwtService,
    ) { }

    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }

    public async getAuthenticatedUser(email: string, hashedPassword: string) {
        try {
            const user = await this._userService.getUserByEmail(email);
            const isPasswordMatching = await bcrypt.compare(
                hashedPassword,
                user.password
            );
            if (!isPasswordMatching) {
                throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
            }
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    public getCookieWithJwtToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this._jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=1d`;
    }

    public async getUserFromAuthenticationToken(token: string) {
        const payload: TokenPayload = this._jwtService.verify(token, {
            secret: 'SECRET'
        });
        if (payload.userId) {
            return this._userService.getUserById(payload.userId);
        }
    }

}
