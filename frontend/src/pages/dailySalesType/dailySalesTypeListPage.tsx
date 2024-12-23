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
import { list } from '../../api/dailySalesType/DailySalesTypeApi';

const DailySalesTypeListPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [dailySalesTypes, setDailySalesTypes] = useState<any[]>([]);

    useEffect(() => {
        const fetchDailySalesTypes = async () => {
            try {
                const fetchedDailySalesTypes = await list();
                setDailySalesTypes(fetchedDailySalesTypes);
            } catch (error) {
                console.error('Error fetching daily sales types:', error);
            }
        };

        fetchDailySalesTypes();
    }, []);

    const filteredDailySalesTypes = dailySalesTypes.filter(dailySalesType =>
        dailySalesType.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                每日銷售類型列表
            </Typography>
            {/* 搜尋框和新增按鈕的響應式佈局 */}
            <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                gap={2}
                mb={2}
            >
                <TextField
                    variant="outlined"
                    placeholder="搜尋每日銷售類型"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/dailySalesType/add')}
                    sx={{
                        width: {
                            xs: '100%',
                            sm: 'auto',
                        },
                    }}
                >
                    新增每日銷售類型
                </Button>
            </Box>
            {/* 表格容器 */}
            <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>識別值</TableCell>
                            <TableCell>名稱</TableCell>
                            <TableCell>是否啟用</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDailySalesTypes
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((dailySalesType) => (
                                <TableRow key={dailySalesType.id}>
                                    <TableCell>{dailySalesType.id}</TableCell>
                                    <TableCell>{dailySalesType.name}</TableCell>
                                    <TableCell>{dailySalesType.isActive ? '是' : '否'}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* 分頁器 */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredDailySalesTypes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default DailySalesTypeListPage;