import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Paper, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { create } from '../../api/staffWork/StaffWorkApi';
import { list as fetchStaffList } from '../../api/staff/StaffApi';
import { StaffWorkCreateRequest } from "../../api/staffWork/create/StaffWorkCreateRequest";
import { toast } from 'react-toastify';

const StaffWorkAddPage: React.FC = () => {
    const navigate = useNavigate();
    const [staffId, setStaffId] = useState('');
    const [workType, setWorkType] = useState('');
    const [workCount, setWorkCount] = useState('');
    const [pay, setPay] = useState('');
    const [stall, setStall] = useState('');
    const [staffList, setStaffList] = useState<any[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const staffs = await fetchStaffList();
                setStaffList(staffs);
            } catch (error) {
                console.error('獲取資料失敗', error);
            }
        };

        fetchData();
    }, []);

    const handleAddStaffWork = async () => {
        const requestData: StaffWorkCreateRequest = {
            staffId: parseInt(staffId),
            workType: parseInt(workType),
            workCount: parseInt(workCount),
            pay: parseInt(pay),
            stall: parseInt(stall),
        };
        let response = await create(requestData);
        if (response == null) {
            return;
        }

        if (Object.keys(response).length > 0 && Object.keys(response)[0] !== 'message') {
            setErrors(response);
            return;
        }
        toast.success('員工工作新增成功！', { position: 'top-right' }); // 顯示成功通知
        navigate('/staffWork'); // 跳轉至列表頁
    };

    return (
        <Box
            p={3}
            component={Paper}
            className="max-w-xl mx-auto my-6"
            style={{ overflowX: 'auto' }}
        >
            <Typography variant="h4" gutterBottom>
                Add Staff Work
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="員工"
                    variant="outlined"
                    select
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    error={Boolean(errors.staffId)}
                    helperText={errors.staffId}
                    fullWidth
                >
                    {staffList.map((staff) => (
                        <MenuItem key={staff.id} value={staff.id}>
                            {staff.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="支付類型"
                    variant="outlined"
                    select
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value)}
                    error={Boolean(errors.workType)}
                    helperText={errors.workType}
                    fullWidth
                >
                    <MenuItem value={1}>時薪</MenuItem>
                    <MenuItem value={2}>日薪</MenuItem>
                    <MenuItem value={3}>月薪</MenuItem>
                </TextField>
                <TextField
                    label="攤位"
                    variant="outlined"
                    select
                    value={stall}
                    onChange={(e) => setStall(e.target.value)}
                    error={Boolean(errors.stall)}
                    helperText={errors.stall}
                    fullWidth
                >
                    <MenuItem value={1}>雜貨</MenuItem>
                    <MenuItem value={2}>水果</MenuItem>
                </TextField>
                <TextField
                    label="時長"
                    variant="outlined"
                    value={workCount}
                    onChange={(e) => setWorkCount(e.target.value)}
                    error={Boolean(errors.workCount)}
                    helperText={errors.workCount}
                    fullWidth
                />
                <TextField
                    label="薪水"
                    variant="outlined"
                    value={pay}
                    onChange={(e) => setPay(e.target.value)}
                    error={Boolean(errors.pay)}
                    helperText={errors.pay}
                    fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleAddStaffWork} fullWidth>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default StaffWorkAddPage;
