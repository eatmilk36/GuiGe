export interface IAuthService {
    newToken(jsonString: string): Promise<string>;
    validateUser(username: string, password: string): Promise<string | null>;
}
