import * as yup from 'yup';
import { StaffWorkCreateRequest } from './StaffWorkCreateRequest';
import { validateSchema } from '../../ValidateSchema';

const StaffWorkCreateSchema = yup.object({
    staffId: yup.number().required('員工 ID 為必填'),
    workType: yup.number().required('工作類型為必填'),
    workCount: yup.number().required('工作數量為必填')
});

export const validateStaffWorkCreate = (data: StaffWorkCreateRequest): Promise<Record<string, string>> => {
    return validateSchema(StaffWorkCreateSchema, data);
};
