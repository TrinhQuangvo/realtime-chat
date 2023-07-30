import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/auth.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private _userRepository: Repository<User>
    ) {

    }

    async getUsers() {
        return this._userRepository.find()
    }

    async createUser(payload: CreateUserDto): Promise<User> {
        const user = this._userRepository.create(payload)
        await this._userRepository.save(user)
        return user
    }

    async getUserByEmail(email: string): Promise<User> {
        return this._userRepository.findOneBy({ email })
    }

    async getUserById(id: number): Promise<User> {
        return this._userRepository.findOneBy({ id })
    }

    async updateUser(payload: UpdateUserDto): Promise<User> {
        return this._userRepository.save(payload)
    }
}
