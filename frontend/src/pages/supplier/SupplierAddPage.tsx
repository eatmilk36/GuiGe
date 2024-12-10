import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { create } from '../../api/supplier/SupplierApi';
import { SupplierCreateRequest } from "../../api/supplier/create/SupplierCreateRequest";
import { toast } from 'react-toastify';

const SupplierAddPage: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleAddSupplier = async () => {
        const requestData: SupplierCreateRequest = {
            name,
            address,
            phone,
            email,
        };
        let response = await create(requestData);
        if (response == null) {
            return;
        }

        if (Object.keys(response).length > 0 && Object.keys(response)[0] !== 'message') {
            setErrors(response);
            return;
        }
        toast.success('供應商新增成功！', { position: 'top-right' }); // 顯示成功通知
        navigate('/supplier'); // 跳轉至列表頁
    };

    return (
        <Box
            p={3}
            component={Paper}
            className="max-w-xl mx-auto my-6"
            style={{ overflowX: 'auto' }}
        >
            <Typography variant="h4" gutterBottom>
                Add Supplier
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    fullWidth
                />
                <TextField
                    label="Address"
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    error={Boolean(errors.address)}
                    helperText={errors.address}
                    fullWidth
                />
                <TextField
                    label="Phone"
                    variant="outlined"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone}
                    fullWidth
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleAddSupplier} fullWidth>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default SupplierAddPage;
