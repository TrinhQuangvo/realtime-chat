import { Body, Controller, Get, HttpCode, HttpStatus, ParseFilePipeBuilder, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicRoutes } from 'src/decorator/auth.decorator';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { UserService } from 'src/user/service/user/user.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @PublicRoutes()
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: './uploads/profile'
            , filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async registerUser(@UploadedFile(
        new ParseFilePipeBuilder()
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
    ) avatar: Express.Multer.File, @Body() payload: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(payload.password, 12);
        const user = await this.userService.createUser({
            ...payload,
            password: hashedPassword,
            avatar: avatar.path
        })
        delete user.password 
        return user
    }

    @Get('')
    getAllUser() {
        return this.userService.getUsers()
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Put('update')
    async updateUser(@Body() payload: UpdateUserDto) {

    }
}
