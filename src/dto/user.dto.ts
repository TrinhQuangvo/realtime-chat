import Role from "src/enum/role.enum"

export class CreateUserDto {
    email: string
    avatar: string
    password: string
    fistName: string
    lastName: string
    role: Role
    isActive: boolean
}

export class UpdateUserDto {
    id: number
    email: string
    avatar: string
    password: string
    fistName: string
    lastName: string
    role: Role
    isActive: boolean
}
