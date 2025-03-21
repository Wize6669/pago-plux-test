export interface IUser {
    id: string;
    name: string
    surname: string
    email: string
    createdAt: Date
}

export interface IUserDTO extends Omit<IUser, 'createdAt'> {

}

export interface IRegister extends Omit<IUserDTO, 'id'> {
    password: string;
}

export interface ILogin extends Pick<IRegister, 'email' | 'password'> {
}




