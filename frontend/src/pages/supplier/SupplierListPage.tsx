import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    TablePagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { list, deleteSupplier } from '../../api/supplier/SupplierApi';

const SupplierListPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [suppliers, setSuppliers] = useState<any[]>([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const fetchedSuppliers = await list();
                setSuppliers(fetchedSuppliers);
            } catch (error) {
                console.error('獲取供應商列表失敗', error);
            }
        };

        fetchSuppliers();
    }, []);

    const handleDelete = async (supplierId: number) => {
        const confirmDelete = window.confirm('確認是否刪除此供應商？');
        if (!confirmDelete) {
            return;
        }

        try {
            await deleteSupplier(supplierId);
            setSuppliers((prevSuppliers) => prevSuppliers.filter((supplier) => supplier.id !== supplierId));
            console.log(`成功刪除供應商 ID: ${supplierId}`);
        } catch (error) {
            console.error(`刪除供應商失敗 ID: ${supplierId}`, error);
        }
    };

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                供應商列表
            </Typography>
            {/* 搜尋框和新增按鈕的響應式佈局 */}
            <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                gap={2} // 元素之間的間距
                mb={2}
            >
                <TextField
                    variant="outlined"
                    placeholder="搜尋供應商"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/supplier/add')}
                    sx={{
                        width: {
                            xs: '100%', // 小螢幕：按鈕全寬
                            sm: 'auto', // 中大螢幕：按鈕自適應
                        },
                    }}
                >
                    新增供應商
                </Button>
            </Box>
            {/* 表格容器 */}
            <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>識別值</TableCell>
                            <TableCell>名稱</TableCell>
                            <TableCell>地址</TableCell>
                            <TableCell>手機</TableCell>
                            <TableCell>信箱</TableCell>
                            <TableCell>創建日期</TableCell>
                            <TableCell>更新日期</TableCell>
                            <TableCell>操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredSuppliers
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((supplier) => (
                                <TableRow key={supplier.id}>
                                    <TableCell>{supplier.id}</TableCell>
                                    <TableCell>{supplier.name}</TableCell>
                                    <TableCell>{supplier.address}</TableCell>
                                    <TableCell>{supplier.phone}</TableCell>
                                    <TableCell>{supplier.email}</TableCell>
                                    <TableCell>{supplier.createdAt}</TableCell>
                                    <TableCell>{supplier.updatedAt}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDelete(supplier.id)}
                                        >
                                            刪除
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* 分頁器 */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredSuppliers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default SupplierListPage;
