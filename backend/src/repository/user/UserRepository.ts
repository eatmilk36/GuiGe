import {UserEntity} from "../../entities/UserEntity";
import {DataSource, Repository} from "typeorm";
import {inject, injectable} from "tsyringe";
import {IUserRepository} from "./IUserRepository";

@injectable()
export class UserRepository implements IUserRepository {
    private readonly userRepository: Repository<UserEntity>;

    constructor(@inject(DataSource) private readonly dataSource: DataSource) {
        this.userRepository = this.dataSource.getRepository(UserEntity);
    }

    async findAll(): Promise<UserEntity[] | null> {
        return this.userRepository.find();
    }

    async findOne(username: string): Promise<UserEntity | null> {
        return await this.userRepository.findOne({
            where: {username, isActive: true},
        });
    }

    async findById(userId: number): Promise<UserEntity | null> {
        return await this.userRepository.findOneBy({id: userId});
    }

    async create(username: string, password: string, email: string): Promise<void> {
        const newUser = this.userRepository.create({
            username,
            password,
            email,
            isActive: true,
        });
        await this.userRepository.save(newUser);
    }

    async update(user: UserEntity): Promise<void> {
        const existingUser = await this.userRepository.findOneBy({id: user.id});
        if (existingUser) {
            await this.userRepository.save(user);
        } else {
            throw new Error(`ID 為 ${user.id} 的使用者未找到`);
        }
    }

    async delete(id: number): Promise<void> {
        const userToDelete = await this.userRepository.findOneBy({id});
        if (userToDelete) {
            await this.userRepository.remove(userToDelete);
        } else {
            throw new Error(`ID 為 ${id} 的使用者未找到`);
        }
    }
}
