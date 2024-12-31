import {Router} from 'express';
import {container} from '../di-container';
import {StaffController} from "../controllers/StaffController";
import {authenticateToken} from "../middleware/AuthMiddleware";

const router = Router();
const staffController = container.resolve(StaffController);

router.get('/list', authenticateToken, async (req, res, next) => {
    try {
        await staffController.findAll(req, res);
    } catch (error) {
        next(error); // 傳遞錯誤給 Express 的錯誤處理中間件
    }
});

router.post('/create', authenticateToken, async (req, res, next) => {
    try {
        await staffController.create(req, res);
    } catch (error) {
        next(error); // 傳遞錯誤給 Express 的錯誤處理中間件
    }
});

router.post('/delete/:id', authenticateToken, async (req, res, next) => {
    try {
        await staffController.delete(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
