import * as yup from 'yup';
import { UserCreateRequest } from './UserCreateRequest'; // 假設這是你的檔案路徑

// 定義驗證 Schema
const userCreateSchema = yup.object({
    username: yup.string().required('Username is required').min(5, 'Username must be at least 5 characters'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    isActive: yup.boolean().optional(),
});

// 驗證函式
export const validateUserCreate = async (data: UserCreateRequest): Promise<Record<string, string>> => {
    try {
        await userCreateSchema.validate(data, { abortEarly: false });
        return {}; // 驗證通過，回傳空錯誤物件
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            // 將錯誤訊息映射為 { field: message }
            const errors: Record<string, string> = {};
            error.inner.forEach((err) => {
                if (err.path) errors[err.path] = err.message;
            });
            return errors;
        }
        throw error; // 拋出其他未知錯誤
    }
};