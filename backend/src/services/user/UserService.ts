import bcrypt from 'bcryptjs';
import {User} from "../../entities/User";
import {inject, injectable} from "tsyringe";
import {IUserRepository} from "../../repository/user/IUserRepository";
import {IUserService} from "./IUserService";

@injectable()
export class UserService implements IUserService {
    constructor(@inject("IUserRepository") private readonly userRepository: IUserRepository) {
    }

    async register(username: string, password: string, email: string): Promise<void> {
        const existingUser = await this.userRepository.findOne(username);
        if (existingUser) throw new Error('user already exists');

        const hashedPassword: string = await bcrypt.hash(password, 10);
        await this.userRepository.createUser(username, hashedPassword, email);
    }

    async validateUser(username: string, password: string): Promise<boolean> {
        const user: User | null = await this.userRepository.findOne(username);
        if (!user) return false;

        return await bcrypt.compare(password, user.password);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }
}
