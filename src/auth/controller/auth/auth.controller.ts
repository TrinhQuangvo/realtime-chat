import { Controller, Get, HttpCode, UseGuards, Post, Req, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/services/auth/auth.service';
import JwtAuthenticationGuard from 'src/guard/jwt-authentication/jwt-authentication.guard';
import { LocalAuthenticationGuard, RequestWithUser } from 'src/guard/local-authentication/local-authentication.guard';

interface iLogin {
    email: string
    password: string
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    @HttpCode(200)
    async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
        const { user } = request;
        const cookie = this.authService.getCookieWithJwtToken(user.id);

        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        return response.send(user);
    }
    
    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        const { user } = request;
        user.password = undefined;
        return user;
    }

    @UseGuards(JwtAuthenticationGuard)
    @HttpCode(200)
    @Post('logout')
    async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
        response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
        return response.sendStatus(200);
    }
}
