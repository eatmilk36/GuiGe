import React, {useState, useEffect} from 'react';
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
import {useNavigate} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {list} from '../../api/UserApi';

const UserListPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await list();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(_ =>
        // 假設有搜尋功能，可以根據需要解開註解
        // user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // user.email.toLowerCase().includes(searchQuery.toLowerCase())
        true
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
               使用者列表
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
                    placeholder="收尋使用者"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    // fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/add-user')}
                    sx={{
                        width: {
                            xs: '100%', // 小螢幕：按鈕全寬
                            sm: 'auto', // 中大螢幕：按鈕自適應
                        },
                    }}
                >
                    新增使用者
                </Button>
            </Box>
            {/* 表格容器 */}
            <TableContainer component={Paper} style={{overflowX: 'auto'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>識別值</TableCell>
                            <TableCell>名稱</TableCell>
                            <TableCell>信箱</TableCell>
                            <TableCell>創建日期</TableCell>
                            <TableCell>更新日期</TableCell>
                            <TableCell>啟用</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.createdAt}</TableCell>
                                    <TableCell>{user.updatedAt}</TableCell>
                                    <TableCell>{user.isActive ? '是' : '否'}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* 分頁器 */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredUsers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default UserListPage;
