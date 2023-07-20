export class CreateUserDto {
    email: string
    avatar: string
    password: string
    fistName: string
    lastName: string
    role: string
    isActive: boolean
}

export class UpdateUserDto {
    id: number
    email: string
    avatar: string
    password: string
    fistName: string
    lastName: string
    role: string
    isActive: boolean
}
