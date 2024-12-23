import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { create } from '../../api/staff/StaffApi';
import { StaffCreateRequest } from "../../api/staff/create/StaffCreateRequest";
import { toast } from 'react-toastify';

const StaffAddPage: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleAddStaff = async () => {
        const requestData: StaffCreateRequest = {
            name,
            phone,
            note,
        };
        let response = await create(requestData);
        if (response == null) {
            return;
        }

        if (Object.keys(response).length > 0 && Object.keys(response)[0] !== 'message') {
            setErrors(response);
            return;
        }
        toast.success('員工新增成功！', { position: 'top-right' }); // 顯示成功通知
        navigate('/staff'); // 跳轉至列表頁
    };

    return (
        <Box
            p={3}
            component={Paper}
            className="max-w-xl mx-auto my-6"
            style={{ overflowX: 'auto' }}
        >
            <Typography variant="h4" gutterBottom>
                新增員工
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
                <TextField
                    label="手機"
                    variant="outlined"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone}
                    fullWidth
                />
                <TextField
                    label="備註"
                    variant="outlined"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    error={Boolean(errors.note)}
                    helperText={errors.note}
                    fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleAddStaff} fullWidth>
                    提交
                </Button>
            </Box>
        </Box>
    );
};

export default StaffAddPage;
