import * as yup from 'yup';
import { DailySalesTypeCreateRequest } from './DailySalesTypeCreateRequest';
import { validateSchema } from '../../ValidateSchema';

const DailySalesTypeCreateSchema = yup.object({
    name: yup.string().required('Name is required').min(1, 'Name must be at least 1 characters'),
});

export const validateDailySalesTypeCreate = (data: DailySalesTypeCreateRequest): Promise<Record<string, string>> => {
    return validateSchema(DailySalesTypeCreateSchema, data);
};
