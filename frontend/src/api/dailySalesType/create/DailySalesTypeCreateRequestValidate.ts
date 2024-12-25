import * as yup from 'yup';
import { DailySalesTypeCreateRequest } from './DailySalesTypeCreateRequest';
import { validateSchema } from '../../ValidateSchema';

const DailySalesTypeCreateSchema = yup.object({
    name: yup.string().required('名稱為必填').min(1, '名稱至少需包含1個字元'),
});

export const validateDailySalesTypeCreate = (data: DailySalesTypeCreateRequest): Promise<Record<string, string>> => {
    return validateSchema(DailySalesTypeCreateSchema, data);
};
