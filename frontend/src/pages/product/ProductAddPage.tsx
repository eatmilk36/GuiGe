import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { create } from '../../api/product/ProductApi'; // 產品新增 API
import { list as getSuppliers } from '../../api/supplier/SupplierApi'; // 供應商列表 API
import { toast } from 'react-toastify';
import { ProductCreateRequest } from "../../api/product/create/ProductCreateRequest";

const ProductAddPage: React.FC = () => {
    const navigate = useNavigate();

    // 表單狀態
    const [supplierId, setSupplierId] = useState<number>(0);
    const [name, setName] = useState('');
    const [pricingUnit, setPricingUnit] = useState('');
    const [unitPrice, setUnitPrice] = useState<number | ''>(''); // 單價
    const [count, setCount] = useState<number | ''>(''); // 數量
    const [note, setNote] = useState('');
    const [suppliers, setSuppliers] = useState<{ id: number; name: string }[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // 取得供應商資料
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const fetchedSuppliers = await getSuppliers();
                setSuppliers(fetchedSuppliers);
            } catch (error) {
                console.error('獲取供應商列表失敗', error);
            }
        };
        fetchSuppliers();
    }, []);

    // 處理產品新增
    const handleAddProduct = async () => {
        const requestData: ProductCreateRequest = {
            supplierId,
            name,
            pricingUnit,
            unitPrice: unitPrice ? Number(unitPrice) : 0,
            count: count ? Number(count) : 0,
            note,
        };

        try {
            let response = await create(requestData);
            if (response == null) {
                return;
            }

            if (Object.keys(response).length > 0 && Object.keys(response)[0] !== 'message') {
                setErrors(response);
                return;
            }

            toast.success('產品新增成功！', { position: 'top-right' });
            navigate('/supplier/products/list'); // 跳轉至產品列表頁
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('產品新增失敗！');
        }
    };

    return (
        <Box
            p={3}
            component={Paper}
            className="max-w-xl mx-auto my-6"
            style={{ overflowX: 'auto' }}
        >
            <Typography variant="h4" gutterBottom>
                新增產品
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                {/* 供應商下拉選單 */}
                <FormControl fullWidth>
                    <InputLabel>供應商</InputLabel>
                    <Select
                        value={supplierId}
                        onChange={(e) => setSupplierId(Number(e.target.value))}
                        error={Boolean(errors.supplierId)}
                    >
                        {suppliers.map((supplier) => (
                            <MenuItem key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

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
                    label="計價單位"
                    variant="outlined"
                    value={pricingUnit}
                    onChange={(e) => setPricingUnit(e.target.value)}
                    error={Boolean(errors.pricingUnit)}
                    helperText={errors.pricingUnit}
                    fullWidth
                />
                <TextField
                    label="單價"
                    variant="outlined"
                    type="number"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(Number(e.target.value))}
                    error={Boolean(errors.unitPrice)}
                    helperText={errors.unitPrice}
                    fullWidth
                />
                <TextField
                    label="數量"
                    variant="outlined"
                    type="number"
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    error={Boolean(errors.count)}
                    helperText={errors.count}
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
                <Button variant="contained" color="primary" onClick={handleAddProduct} fullWidth>
                    提交
                </Button>
            </Box>
        </Box>
    );
};

export default ProductAddPage;