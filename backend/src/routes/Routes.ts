import {Router} from 'express';
import {UserController} from '../controllers/UserController';
import {authenticateToken} from '../middleware/AuthMiddleware';
import {container} from '../di-container';

const router = Router();
const userController = container.resolve(UserController);

router.post('/login', async (req, res, next) => {
    try {
        await userController.login(req, res);
    } catch (error) {
        next(error); // 傳遞錯誤給 Express 的錯誤處理中間件
    }
});

router.post('/register', authenticateToken, async (req, res, next) => {
    try {
        await userController.register(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
