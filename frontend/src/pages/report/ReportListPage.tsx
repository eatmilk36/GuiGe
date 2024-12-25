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

    // 計算收入與支出金額總和
    const incomeSum = filteredReports
        .filter(report => report.salesType === 1) // 1: 收入
        .reduce((sum, report) => sum + (parseFloat(report.totalSales) || 0), 0);

    const expenseSum = filteredReports
        .filter(report => report.salesType === 2) // 2: 支出
        .reduce((sum, report) => sum + (parseFloat(report.totalSales) || 0), 0);

    const totalSalesSum = incomeSum - expenseSum; // 收支差額

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
                供應商列表
            </Typography>
            <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems="center"
                gap={2}
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
                            xs: '100%',
                            sm: 'auto',
                        },
                    }}
                >
                    新增供應商
                </Button>
            </Box>
            <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>名稱</TableCell>
                            <TableCell>類型</TableCell>
                            <TableCell align="right">金額</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredReports.map((report) => (
                            <TableRow key={report.id}>
                                <TableCell>{report.name}</TableCell>
                                <TableCell>{getTypeLabel(report.salesType)}</TableCell>
                                <TableCell align="right">{parseFloat(report.totalSales).toLocaleString()} 元</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={2}>
                {/* 收支統計 */}
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Typography variant="h6" color="text.secondary">
                        總收入：
                        <Typography component="span" color="primary" variant="h6">
                            {incomeSum.toLocaleString()} 元
                        </Typography>
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        總支出：
                        <Typography component="span" color="error" variant="h6">
                            {expenseSum.toLocaleString()} 元
                        </Typography>
                    </Typography>
                </Box>
                {/* 差額顯示 */}
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Typography variant="h6" color="text.secondary">
                        收支差額：
                        <Typography component="span" color="primary" variant="h6">
                            {totalSalesSum.toLocaleString()} 元
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ReportListPage;
