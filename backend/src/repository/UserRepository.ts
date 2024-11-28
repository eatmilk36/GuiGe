import { User } from "../entities/User";
import { Repository, DataSource } from "typeorm";
import { inject, injectable } from "tsyringe";

export interface IUserRepository {
    findUser(username: string): Promise<User | null>;
    findUserById(userId: number): Promise<User | null>;
    createUser(username: string, password: string, email: string): Promise<void>;
    updateUser(user: User): Promise<void>;
    deleteUser(id: number): Promise<void>;
}

@injectable()
export class UserRepository implements IUserRepository {
    private readonly userRepository: Repository<User>;

    constructor(@inject(DataSource) private readonly dataSource: DataSource) {
        this.userRepository = this.dataSource.getRepository(User);
    }

    async findUser(username: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { username, isActive: true },
        });
    }

    async findUserById(userId: number): Promise<User | null> {
        return await this.userRepository.findOneBy({ id: userId });
    }

    async createUser(username: string, password: string, email: string): Promise<void> {
        const newUser = this.userRepository.create({
            username,
            password,
            email,
            isActive: true,
        });
        await this.userRepository.save(newUser);
    }

    async updateUser(user: User): Promise<void> {
        const existingUser = await this.userRepository.findOneBy({ id: user.id });
        if (existingUser) {
            await this.userRepository.save(user);
        } else {
            throw new Error(`User with id ${user.id} not found`);
        }
    }

    async deleteUser(id: number): Promise<void> {
        const userToDelete = await this.userRepository.findOneBy({ id });
        if (userToDelete) {
            await this.userRepository.remove(userToDelete);
        } else {
            throw new Error(`User with id ${id} not found`);
        }
    }
}