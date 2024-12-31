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
import { list, deleteDailySales } from '../../api/dailySales/DailySalesApi';
import { formatDate } from "../../utils/dateUtils";

const DailySalesListPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [dailySales, setDailySales] = useState<any[]>([]);

    useEffect(() => {
        const fetchDailySales = async () => {
            try {
                const fetchedDailySales = await list();
                setDailySales(fetchedDailySales);
            } catch (error) {
                console.error('獲取日銷售額失敗', error);
            }
        };

        fetchDailySales().then(_ => {});
    }, []);

    const handleDelete = async (dailySalesId: number) => {
        const confirmDelete = window.confirm('確認是否刪除此每日銷售？');
        if (!confirmDelete) {
            return;
        }

        try {
            await deleteDailySales(dailySalesId);
            setDailySales((prevDailySales) =>
                prevDailySales.filter((sales) => sales.id !== dailySalesId)
            );
            console.log(`成功刪除每日銷售 ID: ${dailySalesId}`);
        } catch (error) {
            console.error(`刪除每日銷售失敗 ID: ${dailySalesId}`, error);
        }
    };

    const filteredDailySales = dailySales
        .filter(sales => sales.money.toString().includes(searchQuery)) // 篩選金額
        .filter(sales => {
            const saleDate = new Date(sales.createdAt);
            const startOfDay = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
            const endOfDay = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;

            const isAfterStartDate = startOfDay ? saleDate.getTime() >= startOfDay : true;
            const isBeforeEndDate = endOfDay ? saleDate.getTime() <= endOfDay : true;

            return isAfterStartDate && isBeforeEndDate;
        }) // 篩選日期範圍
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // 時間反序排序

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // 轉換 type 為對應文字
    const getTypeLabel = (type: number) => {
        switch (type) {
            case 1:
                return '收入';
            case 2:
                return '支出';
            default:
                return '未知';
        }
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
                gap={2}
                mb={2}
            >
                <TextField
                    variant="outlined"
                    placeholder="搜尋金額"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    type="date"
                    label="開始日期"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    slotProps={{
                        inputLabel: { shrink: true },
                    }}
                />
                <TextField
                    variant="outlined"
                    type="date"
                    label="結束日期"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    slotProps={{
                        inputLabel: { shrink: true },
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/dailySales/add')}
                    sx={{
                        width: {
                            xs: '100%',
                            sm: 'auto',
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
                            <TableCell>類型</TableCell>
                            <TableCell>項目</TableCell>
                            <TableCell>日期</TableCell>
                            <TableCell>操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDailySales
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((sales) => (
                                <TableRow key={sales.id}>
                                    <TableCell>{sales.id}</TableCell>
                                    <TableCell>{sales.money}</TableCell>
                                    <TableCell>{getTypeLabel(sales.salesType)}</TableCell>
                                    <TableCell>{sales.name}</TableCell>
                                    <TableCell>{formatDate(sales.createdAt)}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDelete(sales.id)}
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
