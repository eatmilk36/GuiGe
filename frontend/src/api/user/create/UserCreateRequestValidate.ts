import * as yup from 'yup';
import { UserCreateRequest } from './UserCreateRequest';
import { validateSchema } from '../../ValidateSchema';

const UserCreateSchema = yup.object({
    username: yup.string().required('Username is required').min(5, 'Username must be at least 5 characters'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    isActive: yup.boolean().optional(),
});

export const validateUserCreate = (data: UserCreateRequest): Promise<Record<string, string>> => {
    return validateSchema(UserCreateSchema, data);
};
