import bcrypt from 'bcryptjs';
import {IUserRepository} from '../repository/UserRepository';
import {User} from "../entities/User";

export class UserService {
    constructor(private readonly userRepository: IUserRepository) {
    }

    async register(username: string, password: string, email: string): Promise<void> {
        const existingUser = await this.userRepository.findUser(username);
        if (existingUser) throw new Error('User already exists');

        const hashedPassword: string = await bcrypt.hash(password, 10);
        this.userRepository.createUser(username, hashedPassword, email);
    }

    async validateUser(username: string, password: string): Promise<boolean> {
        const user: User | null = await this.userRepository.findUser(username);
        if (!user) return false;

        return await bcrypt.compare(password, user.password);
    }
}
