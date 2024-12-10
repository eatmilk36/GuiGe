import {User} from "../../entities/User";
import {UserCreateRequest} from "../../models/user/UserCreateRequest";

export interface IUserService {
    register(req: UserCreateRequest): Promise<void>;

    validateUser(username: string, password: string): Promise<boolean>;

    findAll(): Promise<User[]>;
}
