import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/auth.entity';
import { UserService } from 'src/user/service/user/user.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './controller/auth/auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './services/auth/auth.service';

const jwtAsyncConfig: JwtModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (() => ({
        secret: 'SECRET',
        signOptions: {
            expiresIn: '1d',
        },
    })),
}

@Module({
    imports: [UserModule, JwtModule.registerAsync(jwtAsyncConfig), TypeOrmModule.forFeature([User]), PassportModule,],
    controllers: [AuthController],
    providers: [AuthService, UserService, LocalStrategy, JwtStrategy, ConfigService],
    exports: [AuthService]
})

export class AuthModule { }
