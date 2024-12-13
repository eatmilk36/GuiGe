import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { create } from '../../api/dailySales/DailySalesApi';
import { DailySalesCreateRequest } from "../../api/dailySales/create/DailySalesCreateRequest";
import { toast } from 'react-toastify';

const DailySalesAddPage: React.FC = () => {
    const navigate = useNavigate();
    const [money, setMoney] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleAddDailySales = async () => {
        const requestData: DailySalesCreateRequest = {
            money: parseFloat(money),
        };
        let response = await create(requestData);
        if (response == null) {
            return;
        }

        if (Object.keys(response).length > 0 && Object.keys(response)[0] !== 'message') {
            setErrors(response);
            return;
        }
        toast.success('每日銷售新增成功！', { position: 'top-right' }); // 顯示成功通知
        navigate('/dailySales'); // 跳轉至列表頁
    };

    return (
        <Box
            p={3}
            component={Paper}
            className="max-w-xl mx-auto my-6"
            style={{ overflowX: 'auto' }}
        >
            <Typography variant="h4" gutterBottom>
                新增每日銷售
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="金額"
                    variant="outlined"
                    value={money}
                    onChange={(e) => setMoney(e.target.value)}
                    error={Boolean(errors.money)}
                    helperText={errors.money}
                    fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleAddDailySales} fullWidth>
                    提交
                </Button>
            </Box>
        </Box>
    );
};

export default DailySalesAddPage;
