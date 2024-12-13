import {UserEntity} from "../../entities/UserEntity";

export interface IUserRepository {
    findOne(username: string): Promise<UserEntity | null>;

    findAll(): Promise<UserEntity[] | null>;

    findUserById(userId: number): Promise<UserEntity | null>;

    createUser(username: string, password: string, email: string): Promise<void>;

    updateUser(user: UserEntity): Promise<void>;

    deleteUser(id: number): Promise<void>;
}