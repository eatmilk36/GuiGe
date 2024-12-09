export interface UserCreateRequest {
    username: string;
    password: string;
    email: string;
    isActive?: boolean;
}