import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddUserPage: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const handleAddUser = () => {
        console.log('user added:', { name, email, role });
        navigate('/users');
    };

    return (
        <Box
            p={3}
            component={Paper}
            className="max-w-xl mx-auto my-6"
            style={{ overflowX: 'auto' }}
        >
            <Typography variant="h4" gutterBottom>
                Add User
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Role"
                    variant="outlined"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleAddUser} fullWidth>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default AddUserPage;
