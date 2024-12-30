import * as yup from 'yup';
import { DailySalesCreateRequest } from './DailySalesCreateRequest';
import { validateSchema } from '../../ValidateSchema';

const DailySalesCreateSchema = yup.object({
    salesType: yup.number().required('銷售類型為必填'),
    stall: yup.number().required('攤位必填'),
    money: yup.number().required('金額為必填')
});

export const validateDailySalesCreate = (data: DailySalesCreateRequest): Promise<Record<string, string>> => {
    return validateSchema(DailySalesCreateSchema, data);
};
