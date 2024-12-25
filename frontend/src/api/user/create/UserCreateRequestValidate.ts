import * as yup from 'yup';
import { UserCreateRequest } from './UserCreateRequest';
import { validateSchema } from '../../ValidateSchema';

const UserCreateSchema = yup.object({
    username: yup.string().required('使用者名稱為必填').min(5, '使用者名稱至少需包含5個字元'),
    password: yup.string().required('密碼為必填').min(8, '密碼至少需包含8個字元'),
    email: yup.string().required('電子郵件為必填').email('電子郵件格式無效'),
    isActive: yup.boolean().optional(),
});

export const validateUserCreate = (data: UserCreateRequest): Promise<Record<string, string>> => {
    return validateSchema(UserCreateSchema, data);
};
