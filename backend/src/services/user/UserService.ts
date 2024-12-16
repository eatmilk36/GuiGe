import bcrypt from 'bcryptjs';
import {UserEntity} from "../../entities/UserEntity";
import {inject, injectable} from "tsyringe";
import {IUserRepository} from "../../repository/user/IUserRepository";
import {IUserService} from "./IUserService";
import {UserCreateRequest} from "../../models/user/UserCreateRequest";

@injectable()
export class UserService implements IUserService {
    constructor(@inject("IUserRepository") private readonly userRepository: IUserRepository) {
    }

    async register(req: UserCreateRequest): Promise<void> {
        const existingUser = await this.userRepository.findOne(req.username);
        if (existingUser) throw new Error('user already exists');

        const hashedPassword: string = await bcrypt.hash(req.password, 10);
        await this.userRepository.create(req.username, hashedPassword, req.email);
    }

    async validateUser(username: string, password: string): Promise<boolean> {
        const user: UserEntity | null = await this.userRepository.findOne(username);
        if (!user) return false;

        return await bcrypt.compare(password, user.password);
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.findAll();
    }
}
