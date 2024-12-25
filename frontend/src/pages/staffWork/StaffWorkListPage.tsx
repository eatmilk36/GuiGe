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
import { list } from '../../api/staffWork/StaffWorkApi';

const StaffWorkListPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [staffWorks, setStaffWorks] = useState<any[]>([]);

    useEffect(() => {
        const fetchStaffWorks = async () => {
            try {
                const fetchedStaffWorks = await list();
                setStaffWorks(fetchedStaffWorks);
            } catch (error) {
                console.error('獲取員工工作列表失敗', error);
            }
        };

        fetchStaffWorks();
    }, []);

    const filteredStaffWorks = staffWorks.filter(staffWork =>
        staffWork.name.toString().includes(searchQuery) ||
        staffWork.workType.toString().includes(searchQuery)
    );

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const renderWorkType = (type: number) => {
        switch (type) {
            case 1:
                return '時薪';
            case 2:
                return '日薪';
            case 3:
                return '月薪';
            default:
                return '未知類型';
        }
    };

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                員工工作列表
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
                    placeholder="搜尋員工"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/staffWork/add')}
                    sx={{
                        width: {
                            xs: '100%', // 小螢幕：按鈕全寬
                            sm: 'auto', // 中大螢幕：按鈕自適應
                        },
                    }}
                >
                    新增工作
                </Button>
            </Box>
            {/* 表格容器 */}
            <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>員工ID</TableCell>
                            <TableCell>工作類型</TableCell>
                            <TableCell>工作數量</TableCell>
                            <TableCell>薪水</TableCell>
                            <TableCell>創建日期</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStaffWorks
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((staffWork) => (
                                <TableRow key={staffWork.id}>
                                    <TableCell>{staffWork.id}</TableCell>
                                    <TableCell>{staffWork.name}</TableCell>
                                    <TableCell>{renderWorkType(staffWork.workType)}</TableCell>
                                    <TableCell>{staffWork.workCount}</TableCell>
                                    <TableCell>{staffWork.pay}</TableCell>
                                    <TableCell>{staffWork.createdAt}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* 分頁器 */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredStaffWorks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default StaffWorkListPage;
