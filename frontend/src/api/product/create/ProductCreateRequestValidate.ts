import * as yup from 'yup';
import { ProductCreateRequest } from './ProductCreateRequest';
import { validateSchema } from '../../ValidateSchema';

const ProductCreateSchema = yup.object({
    supplierId: yup
        .number()
        .typeError('供應商 ID 必須是數字')
        .required('供應商為必填項')
        .positive('供應商 ID 必須為正數')
        .integer('供應商 ID 必須是整數'),

    name: yup
        .string()
        .required('名稱為必填項')
        .max(20, '名稱不能超過 20 個字'),

    pricingUnit: yup
        .string()
        .required('計價單位為必填項')
        .max(10, '計價單位不能超過 10 個字'),

    unitPrice: yup
        .number()
        .typeError('單價必須是數字')
        .required('單價為必填項')
        .positive('單價必須大於 0'),

    count: yup
        .number()
        .typeError('數量必須是數字')
        .required('數量為必填項')
        .integer('數量必須是整數')
        .min(1, '數量必須至少為 1'),

    note: yup
        .string()
        .required('備註為必填項')
        .max(255, '備註不能超過 255 個字'),
});

export const validateProductCreate = (data: ProductCreateRequest): Promise<Record<string, string>> => {
    return validateSchema(ProductCreateSchema, data);
};
