import * as yup from 'yup';
import { DailySalesCreateRequest } from './DailySalesCreateRequest';
import { validateSchema } from '../../ValidateSchema';

const DailySalesCreateSchema = yup.object({
    salesType: yup.number().required('salesType is required'),
    money: yup.number().required('Money is required')
});

export const validateDailySalesCreate = (data: DailySalesCreateRequest): Promise<Record<string, string>> => {
    return validateSchema(DailySalesCreateSchema, data);
};
