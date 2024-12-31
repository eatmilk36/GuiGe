import {Router} from 'express';
import {container} from '../di-container';
import {DailySalesController} from "../controllers/DailySalesController";
import {authenticateToken} from "../middleware/AuthMiddleware";

const router = Router();
const dailySalesController = container.resolve(DailySalesController);

router.get('/list', authenticateToken, async (req, res, next) => {
    try {
        await dailySalesController.findAll(req, res);
    } catch (error) {
        next(error); // 傳遞錯誤給 Express 的錯誤處理中間件
    }
});

router.post('/create', authenticateToken, async (req, res, next) => {
    try {
        await dailySalesController.create(req, res);
    } catch (error) {
        next(error); // 傳遞錯誤給 Express 的錯誤處理中間件
    }
});

router.get('/dashboard', authenticateToken, async (req, res, next) => {
    try {
        await dailySalesController.dashboard(req, res);
    } catch (error) {
        next(error); // 傳遞錯誤給 Express 的錯誤處理中間件
    }
});

router.post('/delete/:id', authenticateToken, async (req, res, next) => {
    try {
        await dailySalesController.delete(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
