import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/auth.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {

    }

    async getUsers() {
        return this.userRepository.find()
    }

    async createUser(payload: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(payload)
        await this.userRepository.save(user)
        return user
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOneBy({ email })
    }

    async getUserById(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id })
    }

    async updateUser(payload: UpdateUserDto): Promise<User> {
        return this.userRepository.save(payload)
    }
}
