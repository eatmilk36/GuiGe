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
import { list as listStaff } from '../../api/staff/StaffApi';

const StaffListPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [staffList, setStaffList] = useState<any[]>([]);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const fetchedStaff = await listStaff();
                setStaffList(fetchedStaff);
            } catch (error) {
                console.error('獲取員工列表失敗', error);
            }
        };

        fetchStaff();
    }, []);

    const filteredStaff = staffList.filter(staff =>
        staff.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                員工列表
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
                    placeholder="搜尋員工"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/staff/add')}
                    sx={{
                        width: {
                            xs: '100%',
                            sm: 'auto',
                        },
                    }}
                >
                    新增員工
                </Button>
            </Box>
            {/* 表格容器 */}
            <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>識別值</TableCell>
                            <TableCell>名稱</TableCell>
                            <TableCell>手機</TableCell>
                            <TableCell>備註</TableCell>
                            <TableCell>創建日期</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStaff
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((staff) => (
                                <TableRow key={staff.id}>
                                    <TableCell>{staff.id}</TableCell>
                                    <TableCell>{staff.name}</TableCell>
                                    <TableCell>{staff.phone}</TableCell>
                                    <TableCell>{staff.note}</TableCell>
                                    <TableCell>{staff.createdAt}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* 分頁器 */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredStaff.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default StaffListPage;
