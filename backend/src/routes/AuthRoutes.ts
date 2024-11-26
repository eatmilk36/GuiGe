import {Router} from 'express';
import {AuthController} from '../controllers/AuthController';
import {authenticateToken} from '../middleware/authMiddleware';

const router = Router();
const authController = new AuthController();

router.post('/login', async (req, res, next) => {
    try {
        await authController.login(req, res);
    } catch (error) {
        next(error); // 傳遞錯誤給 Express 的錯誤處理中間件
    }
});

router.post('/register', authenticateToken, async (req, res, next) => {
    try {
        await authController.register(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
