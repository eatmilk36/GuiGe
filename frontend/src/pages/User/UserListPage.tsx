import React, {useState, useEffect} from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TextField, Button, Typography, Box, TablePagination
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {list} from '../../api/UserApi'; // Import the list function to fetch user data

const UserListPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [users, setUsers] = useState<any[]>([]); // State to hold fetched user data

    useEffect(() => {
        // Fetch the user list when the component mounts
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await list(); // Call the list function to get users
                setUsers(fetchedUsers); // Update state with fetched users
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers().then(r => {
            console.log('Fetched users:', r)
        });
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    const filteredUsers = users.filter(user =>
        // user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
                User List
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={2}>
                {/* 搜尋框 */}
                <TextField
                    variant="outlined"
                    placeholder="Search Users"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/* 新增按鈕 */}
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon/>}
                    onClick={() => navigate('/add-user')} // 導到新增頁面
                >
                    Add User
                </Button>
            </Box>
            {/* 表格 */}
            <TableContainer component={Paper}>
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
                                    <TableCell>{user.isActive ? "是" : "否"}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* 分頁 */}
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
