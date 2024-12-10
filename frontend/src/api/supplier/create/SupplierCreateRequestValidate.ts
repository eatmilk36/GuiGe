import * as yup from 'yup';
import { SupplierCreateRequest } from './SupplierCreateRequest'; // 假設這是你的檔案路徑

// 定義驗證 Schema
const SupplierCreateSchema = yup.object({
    name: yup.string().required('Name is required').min(1, 'Name must be at least 4 characters'),
    address: yup.string().required('Address is required').min(10, 'Address must be at least 10 characters'),
    email: yup.string().required('Email is required').min(10, 'Email must be at least 10 characters').email('Invalid email format'),
    phone: yup.string().required('Phone is required').min(10, 'Phone must be at least 10 characters'),
    isActive: yup.boolean().optional(),
});

// 驗證函式
export const validateSupplierCreate = async (data: SupplierCreateRequest): Promise<Record<string, string>> => {
    try {
        await SupplierCreateSchema.validate(data, { abortEarly: false });
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