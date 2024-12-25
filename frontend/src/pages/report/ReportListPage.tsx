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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { list } from '../../api/report/ReportApi';

const ReportListPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [reports, setReports] = useState<any[]>([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const fetchedReports = await list();
                setReports(fetchedReports);
            } catch (error) {
                console.error('獲取報表列表失敗', error);
            }
        };

        fetchReports();
    }, []);

    const filteredReports = reports.filter(report =>
        report.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 計算加總金額（轉為數值後再加總）
    const totalSalesSum = filteredReports.reduce((sum, report) => {
        const totalSales = parseFloat(report.totalSales) || 0;
        return sum + totalSales;
    }, 0);

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
                alignItems="center"
                gap={2} // 元素之間的間距
                mb={2}
            >
                <TextField
                    variant="outlined"
                    placeholder="搜尋供應商"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/report/add')}
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
                            <TableCell>名稱</TableCell>
                            <TableCell align="right">金額</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredReports.map((report) => (
                            <TableRow key={report.id}>
                                <TableCell>{report.name}</TableCell>
                                <TableCell align="right">{parseFloat(report.totalSales).toLocaleString()} 元</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* 總金額顯示 */}
            <Box mt={2} display="flex" justifyContent="flex-end">
                <Typography variant="h6" color="text.secondary">
                    總金額：<Typography component="span" color="primary" variant="h6">{totalSalesSum.toLocaleString()}</Typography> 元
                </Typography>
            </Box>
        </Box>
    );
};

export default ReportListPage;
