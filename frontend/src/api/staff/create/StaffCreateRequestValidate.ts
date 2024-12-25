import * as yup from 'yup';
import { StaffCreateRequest } from './StaffCreateRequest';
import { validateSchema } from '../../ValidateSchema';

const StaffCreateSchema = yup.object({
    name: yup.string().required('名稱為必填').min(1, '名稱至少需包含4個字元'),
    phone: yup.string().required('電話為必填').min(10, '電話至少需包含10個字元'),
    note: yup.string(),
});

export const validateStaffCreate = (data: StaffCreateRequest): Promise<Record<string, string>> => {
    return validateSchema(StaffCreateSchema, data);
};
