import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserService } from '../../service/user/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly _userService: UserService) {

    }

    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: 'src/uploads/profile'
            , filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    @HttpCode(201)
    @Post('register')
    async registerUser(@Body() payload: CreateUserDto, @UploadedFile(
        new ParseFilePipeBuilder()
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
    ) avatar: Express.Multer.File) {
        const hashedPassword = await bcrypt.hash(payload.password, 12);
        const userData = {
            ...payload,
            password: hashedPassword,
            avatar: `user/avatars/${avatar.filename}`
        }
        const user = await this._userService.createUser(userData)
        delete user.password
        return user
    }

    @Get('')
    getAllUser() {
        return this._userService.getUsers()
    }

    @HttpCode(200)
    @Put('update')
    async updateUser(id, @Body() payload: UpdateUserDto) {
        return this._userService.updateUser(id, payload)
    }

    @HttpCode(200)
    @Get('avatars/:id')
    async serveAvatar(@Param('id') id: string, @Res() res): Promise<any> {
        return await res.sendFile(id, { root: 'src/uploads/profile' });
    }
}
