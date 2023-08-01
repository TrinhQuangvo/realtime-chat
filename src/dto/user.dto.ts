import Role from "src/enum/role.enum"

export interface CreateUserDto {
    email: string
    avatar: string
    password: string
    fistName: string
    lastName: string
    role: Role
    isActive: boolean
}

export interface UpdateUserDto {  
    avatar?: string
    password?: string
    fistName?: string
    lastName?: string 
    isActive?: boolean
}
