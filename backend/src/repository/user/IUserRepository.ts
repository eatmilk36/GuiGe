import {UserEntity} from "../../entities/UserEntity";

export interface IUserRepository {
    findOne(username: string): Promise<UserEntity | null>;

    findAll(): Promise<UserEntity[] | null>;

    findById(userId: number): Promise<UserEntity | null>;

    create(username: string, password: string, email: string): Promise<void>;

    update(user: UserEntity): Promise<void>;

    delete(id: number): Promise<void>;
}