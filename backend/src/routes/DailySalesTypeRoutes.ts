import {Router} from 'express';
import {container} from '../di-container';
import {DailySalesTypeController} from "../controllers/DailySalesTypeController";
import {authenticateToken} from "../middleware/AuthMiddleware";

const router = Router();
const dailySalesTypeController = container.resolve(DailySalesTypeController);

router.get('/list', authenticateToken, async (req, res, next) => {
    try {
        await dailySalesTypeController.findAll(req, res);
    } catch (error) {
        next(error); // 傳遞錯誤給 Express 的錯誤處理中間件
    }
});

router.post('/create', authenticateToken, async (req, res, next) => {
    try {
        await dailySalesTypeController.create(req, res);
    } catch (error) {
        next(error); // 傳遞錯誤給 Express 的錯誤處理中間件
    }
});

export default router;
