import React, {useState, useEffect} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    TextField,
} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {list} from '../../api/report/ReportApi';

const ReportListPage: React.FC = () => {
    useNavigate();
    const [reports, setReports] = useState<any[]>([]);
    const [date, setDate] = useState<string>(() => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // 初始化為今天日期，格式為 YYYY-MM-DD
    });
    const {stall, date: routeDate} = useParams<{ stall: string, date: string }>(); // 抓取路由參數

    useEffect(() => {
        if (routeDate) {
            setDate(routeDate); // 如果路由中有日期參數，將其設置為當前日期狀態
        }
    }, [routeDate]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                if (stall) {
                    const fetchedReports = await list(stall, date); // 將日期作為第二個參數傳入 list 函數
                    setReports(fetchedReports);
                } else {
                    console.error('路由參數 stall 缺失');
                }
            } catch (error) {
                console.error('獲取報表列表失敗', error);
            }
        };

        fetchReports();
    }, [stall, date]); // 監聽 date 變數變化

    const getStallName = (stall: any) => {
        switch (stall) {
            case "1":
                return "雜貨攤";
            case "2":
                return "水果攤";
            default:
                return "未知攤位";
        }
    };

    const filteredReports = reports.filter(report =>
        report.name.toLowerCase()
    );

    // 計算收入與支出金額總和
    const incomeSum = filteredReports
        .filter(report => report.salesType == 1) // 1: 收入
        .reduce((sum, report) => sum + (parseInt(report.totalSales) ?? 0), 0);

    const expenseSum = filteredReports
        .filter(report => report.salesType == 2) // 2: 支出
        .reduce((sum, report) => sum + (parseInt(report.totalSales) ?? 0), 0);

    const totalSalesSum = incomeSum + expenseSum; // 收支差額

    const getTypeLabel = (type: number) => {
        switch (type.toString()) {
            case "1":
                return '收入';
            case "2":
                return '支出';
            default:
                return '未知';
        }
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value); // 更新日期狀態
    };

    return (
        <Box p={3}>
            {/* 攤位名稱顯示 */}
            <Typography variant="h5" mb={3}>
                {getStallName(stall)} 報表列表
            </Typography>

            {/* 日期選擇器 */}
            <Box mb={3} display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">選擇日期：</Typography>
                <TextField
                    label="日期"
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />
            </Box>

            <TableContainer component={Paper} style={{overflowX: 'auto'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>名稱</TableCell>
                            <TableCell>類型</TableCell>
                            <TableCell align="right">金額</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredReports
                            .filter((report) => report.totalSales != null) // 過濾掉 totalSales 為 null 或 undefined 的項目
                            .map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell>{report.name}</TableCell>
                                    <TableCell>{getTypeLabel(report.salesType)}</TableCell>
                                    <TableCell
                                        align="right">{parseFloat(report.totalSales).toLocaleString()} 元</TableCell>
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