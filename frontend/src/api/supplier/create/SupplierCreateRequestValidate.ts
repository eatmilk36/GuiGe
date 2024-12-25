import * as yup from 'yup';
import { SupplierCreateRequest } from './SupplierCreateRequest';
import { validateSchema } from '../../ValidateSchema';

const SupplierCreateSchema = yup.object({
    name: yup.string().required('名稱為必填').min(1, '名稱至少需包含4個字元'),
    address: yup.string().required('地址為必填').min(10, '地址至少需包含10個字元'),
    email: yup.string().required('電子郵件為必填').min(10, '電子郵件至少需包含10個字元').email('電子郵件格式無效'),
    phone: yup.string().required('電話為必填').min(10, '電話至少需包含10個字元'),
    isActive: yup.boolean().optional(),
});

export const validateSupplierCreate = (data: SupplierCreateRequest): Promise<Record<string, string>> => {
    return validateSchema(SupplierCreateSchema, data);
};
