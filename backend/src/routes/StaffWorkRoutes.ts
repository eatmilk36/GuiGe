import {Router} from 'express';
import {container} from '../di-container';
import {authenticateToken} from "../middleware/AuthMiddleware";
import {StaffWorkController} from "../controllers/StaffWordController";

const router = Router();
const staffWorkController = container.resolve(StaffWorkController);

router.get('/list', authenticateToken, async (req, res, next) => {
    try {
        await staffWorkController.findAll(req, res);
    } catch (error) {
        next(error); // 傳遞錯誤給 Express 的錯誤處理中間件
    }
});

router.post('/create', authenticateToken, async (req, res, next) => {
    try {
        await staffWorkController.create(req, res);
    } catch (error) {
        next(error); // 傳遞錯誤給 Express 的錯誤處理中間件
    }
});

export default router;
