import {User} from "../../entities/User";

export interface IUserService {
    register(username: string, password: string, email: string): Promise<void>;
    validateUser(username: string, password: string): Promise<boolean>;
    findAll(): Promise<User[]>;
}
