import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface AutoCloseSnackbarProps {
    message: string;
    type: 'success' | 'error';
    open: boolean;
    onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
    duration?: number; // 新增 autoHideDuration 的可選屬性
}

const AutoCloseSnackbar: React.FC<AutoCloseSnackbarProps> = ({
                                                                 message,
                                                                 type,
                                                                 open,
                                                                 onClose,
                                                                 duration = 3000, // 默認值為 3000 毫秒
                                                             }) => {
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return; // 忽略點擊背景關閉的情況
        onClose(event, reason);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={duration}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // 默認位置可調整
        >
            <Alert onClose={handleClose} severity={type} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AutoCloseSnackbar;
