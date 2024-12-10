import * as yup from 'yup';

export const validateSchema = async <T extends yup.AnyObject>(
    schema: yup.ObjectSchema<T>,
    data: T
): Promise<Record<string, string>> => {
    try {
        await schema.validate(data, { abortEarly: false });
        return {}; // 驗證通過，回傳空錯誤物件
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            // 將錯誤訊息映射為 { field: message }
            const errors: Record<string, string> = {};
            error.inner.forEach((err) => {
                if (err.path) errors[err.path] = err.message;
            });
            return errors;
        }
        throw error; // 拋出其他未知錯誤
    }
};
