import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Box, Paper, MenuItem, Select, InputLabel, FormControl} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {create} from '../../api/dailySales/DailySalesApi';
import {DailySalesCreateRequest} from "../../api/dailySales/create/DailySalesCreateRequest";
import {list} from '../../api/dailySalesType/DailySalesTypeApi';
import {toast} from 'react-toastify';

const DailySalesAddPage: React.FC = () => {
    const navigate = useNavigate();
    const [money, setMoney] = useState('');
    const [salesType, setSalesType] = useState(1); // 初始值為收入 (1)
    const [dailySalesType, setDailySalesType] = useState(0);
    const [dailySalesTypeList, setDailySalesTypeList] = useState<{ id: number; name: string }[]>([]);
    const [stall, setStall] = useState(1); // 初始值為雜貨 (1)
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        // 獲取 DailySalesType 數據
        const fetchDailySalesTypesList = async () => {
            try {
                const response = await list();
                setDailySalesTypeList(response || []);
                if (response.length > 0) {
                    setDailySalesType(response[0].id)
                }
            } catch (error) {
                console.error('獲取類型數據失敗', error);
            }
        };

        fetchDailySalesTypesList();
    }, []);

    const handleAddDailySales = async () => {
        const requestData: DailySalesCreateRequest = {
            salesType: salesType,
            money: Number(money),
            dailySalesTypeId: Number(dailySalesType),
            stall: Number(stall),
        };

        let response = await create(requestData);
        if (response == null) {
            return;
        }

        if (Object.keys(response).length > 0 && Object.keys(response)[0] !== 'message') {
            setErrors(response);
            return;
        }

        toast.success('每日銷售新增成功！', {position: 'top-right'}); // 顯示成功通知
        navigate('/dailySales'); // 跳轉至列表頁
    };

    return (
        <Box
            p={3}
            component={Paper}
            className="max-w-xl mx-auto my-6"
            style={{overflowX: 'auto'}}
        >
            <Typography variant="h4" gutterBottom>
                新增每日銷售
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                {/* 類型選擇 */}
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="type-label">類型</InputLabel>
                    <Select
                        labelId="type-label"
                        value={salesType}
                        onChange={(e) => setSalesType(Number(e.target.value))}
                        label="類型"
                    >
                        <MenuItem value={1}>收入</MenuItem>
                        <MenuItem value={2}>支出</MenuItem>
                    </Select>
                </FormControl>

                {/* 項目選擇 */}
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="project-label">項目</InputLabel>
                    <Select
                        labelId="project-label"
                        value={dailySalesType}
                        onChange={(e) => setDailySalesType(e.target.value as number)}
                        label="項目"
                    >
                        {dailySalesTypeList.map((proj) => (
                            <MenuItem key={proj.id} value={proj.id}>
                                {proj.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* 攤位選擇 */}
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="stall-label">攤位</InputLabel>
                    <Select
                        labelId="stall-label"
                        value={stall}
                        onChange={(e) => setStall(Number(e.target.value))}
                        label="攤位"
                    >
                        <MenuItem value={1}>雜貨</MenuItem>
                        <MenuItem value={2}>水果攤</MenuItem>
                    </Select>
                </FormControl>

                {/* 金額輸入 */}
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
