// src/repository/UserRepository.ts

import {User} from "../entities/User";
import {AppDataSource} from "../mySQL/Db";
import {Repository} from "typeorm";

export interface IUserRepository {
    findUser(username: string): Promise<User[]>;

    findUserById(userId: number): Promise<User | null>;

    createUser(username: string, password: string): void;

    UpdateUser(user: User): void;

    deleteUser(id: number): void;
}

export class UserRepository implements IUserRepository {
    protected readonly _userRepository: Repository<User>;

    constructor() {
        this._userRepository = AppDataSource.getRepository(User);
    }

    async findUserById(userId: number): Promise<User | null> {
        return await this._userRepository.findOneBy({id: userId});
    }

    async UpdateUser(user: User): Promise<void> {
        const userToUpdate = await this._userRepository.findOneBy({id: 1});
        if (userToUpdate) {
            await this._userRepository.save(userToUpdate);
        }
    }

    async deleteUser(id: number): Promise<void> {
        const userToDelete = await this._userRepository.findOneBy({id: id});
        if (userToDelete) {
            await this._userRepository.remove(userToDelete);
        }
    }

    async findUser(username: string): Promise<User[]> {
        return await this._userRepository.find({
            where: {
                username: username
            },
        });
    }

    async createUser(username: string, password: string): Promise<void> {
        const newUser = new User();
        newUser.username = username;
        newUser.password = password;
        newUser.email = 'alice@example.com';
        newUser.isActive = true;
        await this._userRepository.save(newUser);
        console.log('New user saved:', newUser);
    }
}
