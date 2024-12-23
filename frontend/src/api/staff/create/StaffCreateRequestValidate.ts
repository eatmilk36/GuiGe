import * as yup from 'yup';
import { StaffCreateRequest } from './StaffCreateRequest';
import { validateSchema } from '../../ValidateSchema';

const StaffCreateSchema = yup.object({
    name: yup.string().required('Name is required').min(1, 'Name must be at least 4 characters'),
    phone: yup.string().required('Phone is required').min(10, 'Phone must be at least 10 characters'),
    note: yup.string(),
});

export const validateStaffCreate = (data: StaffCreateRequest): Promise<Record<string, string>> => {
    return validateSchema(StaffCreateSchema, data);
};
