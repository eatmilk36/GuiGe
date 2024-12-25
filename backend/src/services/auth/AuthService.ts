import {inject, injectable} from "tsyringe";
import {UserEntity} from "../../entities/UserEntity";
import bcrypt from "bcryptjs";
import {IUserRepository} from "../../repository/user/IUserRepository";
import jwt from "jsonwebtoken";
import {IAuthService} from "./IAuthService";

@injectable()
export class AuthService implements IAuthService {
    constructor(@inject("IUserRepository") private readonly userRepository: IUserRepository) {
    }

    private generateToken(payload: object): string {
        if (!process.env.SECRET_KEY) {
            throw new Error("環境變數中未定義 SECRET_KEY。");
        }
        return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    }

    async newToken(jsonString: string): Promise<string> {
        const user: UserEntity = JSON.parse(jsonString);
        return this.generateToken({ user });
    }

    async validateUser(username: string, password: string): Promise<string | null> {
        const user: UserEntity | null = await this.userRepository.findOne(username);
        if (!user) return null;

        const isPass = await bcrypt.compare(password, user.password);
        return isPass ? this.newToken(JSON.stringify(user)) : null;
    }
}
