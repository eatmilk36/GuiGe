import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface AutoCloseSnackbarProps {
    message: string;
    type: 'success' | 'error';
    open: boolean;
    onClose: () => void;
}

const AutoCloseSnackbar: React.FC<AutoCloseSnackbarProps> = ({ message, type, open, onClose }) => {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const handleClose = (
        event: React.SyntheticEvent<any> | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') return; // 忽略點擊背景關閉的情況
        setIsOpen(false);
        onClose();
    };

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={3000}
            onClose={handleClose} // 使用正確的 onClose 簽名
        >
            <Alert onClose={handleClose} severity={type} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AutoCloseSnackbar;
