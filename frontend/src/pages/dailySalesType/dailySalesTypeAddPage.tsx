import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { create } from '../../api/dailySalesType/DailySalesTypeApi';
import { DailySalesTypeCreateRequest } from "../../api/dailySalesType/create/DailySalesTypeCreateRequest";
import { toast } from 'react-toastify';

const DailySalesTypeAddPage: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleAddDailySalesType = async () => {
        const requestData: DailySalesTypeCreateRequest = {
            name,
        };
        let response = await create(requestData);
        if (response == null) {
            return;
        }

        if (Object.keys(response).length > 0 && Object.keys(response)[0] !== 'message') {
            setErrors(response);
            return;
        }
        toast.success('每日銷售類型新增成功！', { position: 'top-right' }); // 顯示成功通知
        navigate('/dailySalesType'); // 跳轉至列表頁
    };

    return (
        <Box
            p={3}
            component={Paper}
            className="max-w-xl mx-auto my-6"
            style={{ overflowX: 'auto' }}
        >
            <Typography variant="h4" gutterBottom>
                新增每日銷售類型
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="名稱"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleAddDailySalesType} fullWidth>
                    提交
                </Button>
            </Box>
        </Box>
    );
};

export default DailySalesTypeAddPage;
