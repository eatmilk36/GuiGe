import {User} from "../../entities/User";

export interface IUserRepository {
    findOne(username: string): Promise<User | null>;

    findAll(): Promise<User[] | null>;

    findUserById(userId: number): Promise<User | null>;

    createUser(username: string, password: string, email: string): Promise<void>;

    updateUser(user: User): Promise<void>;

    deleteUser(id: number): Promise<void>;
}