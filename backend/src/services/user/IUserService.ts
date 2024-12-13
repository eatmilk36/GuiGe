import {UserEntity} from "../../entities/UserEntity";
import {UserCreateRequest} from "../../models/user/UserCreateRequest";

export interface IUserService {
    register(req: UserCreateRequest): Promise<void>;

    validateUser(username: string, password: string): Promise<boolean>;

    findAll(): Promise<UserEntity[]>;
}
