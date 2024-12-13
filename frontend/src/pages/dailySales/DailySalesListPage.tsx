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
import { list } from '../../api/dailySales/DailySalesApi';

const DailySalesListPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [dailySales, setDailySales] = useState<any[]>([]);

    useEffect(() => {
        const fetchDailySales = async () => {
            try {
                const fetchedDailySales = await list();
                setDailySales(fetchedDailySales);
            } catch (error) {
                console.error('Error fetching daily sales:', error);
            }
        };

        fetchDailySales();
    }, []);

    const filteredDailySales = dailySales.filter(sale =>
        sale.money.toString().includes(searchQuery)
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
                每日銷售列表
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
                    placeholder="搜尋金額"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/dailySales/add')}
                    sx={{
                        width: {
                            xs: '100%', // 小螢幕：按鈕全寬
                            sm: 'auto', // 中大螢幕：按鈕自適應
                        },
                    }}
                >
                    新增每日銷售
                </Button>
            </Box>
            {/* 表格容器 */}
            <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>識別值</TableCell>
                            <TableCell>金額</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDailySales
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((sale) => (
                                <TableRow key={sale.id}>
                                    <TableCell>{sale.id}</TableCell>
                                    <TableCell>{sale.money}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* 分頁器 */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredDailySales.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default DailySalesListPage;
