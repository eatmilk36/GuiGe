import * as yup from 'yup';
import {StaffWorkCreateRequest} from './StaffWorkCreateRequest';
import {validateSchema} from '../../ValidateSchema';

const StaffWorkCreateSchema = yup.object({
    staffId: yup.number().required('StaffId is required'),
    workType: yup.number().required('WorkType is required'),
    workCount: yup.number().required('WorkCount is required')
});

export const validateStaffWorkCreate = (data: StaffWorkCreateRequest): Promise<Record<string, string>> => {
    return validateSchema(StaffWorkCreateSchema, data);
};
