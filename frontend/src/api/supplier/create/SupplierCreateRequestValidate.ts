import * as yup from 'yup';
import { SupplierCreateRequest } from './SupplierCreateRequest';
import { validateSchema } from '../../ValidateSchema';

const SupplierCreateSchema = yup.object({
    name: yup.string().required('Name is required').min(1, 'Name must be at least 4 characters'),
    address: yup.string().required('Address is required').min(10, 'Address must be at least 10 characters'),
    email: yup.string().required('Email is required').min(10, 'Email must be at least 10 characters').email('Invalid email format'),
    phone: yup.string().required('Phone is required').min(10, 'Phone must be at least 10 characters'),
    isActive: yup.boolean().optional(),
});

export const validateSupplierCreate = (data: SupplierCreateRequest): Promise<Record<string, string>> => {
    return validateSchema(SupplierCreateSchema, data);
};
