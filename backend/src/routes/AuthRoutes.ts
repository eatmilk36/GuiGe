import {Router} from 'express';
import {container} from '../di-container';
import {AuthController} from "../controllers/AuthController";

const router = Router();
const authController = container.resolve(AuthController);

router.post('/login', async (req, res, next) => {
    try {
        await authController.login(req, res);
    } catch (error) {
        next(error); // 傳遞錯誤給 Express 的錯誤處理中間件
    }
});

router.post('/renewToken', async (req, res, next) => {
    try {
        await authController.renewToken(req, res);
    } catch (error) {
        next(error); // 傳遞錯誤給 Express 的錯誤處理中間件
    }
});

export default router;
