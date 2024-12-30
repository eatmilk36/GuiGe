import {Router} from 'express';
import {container} from '../di-container';
import {authenticateToken} from "../middleware/AuthMiddleware";
import {ReportController} from "../controllers/ReportController";

const router = Router();
const dailyController = container.resolve(ReportController);

router.get('/daily/:stall', authenticateToken, async (req, res, next) => {
    try {
        await dailyController.daily(req, res);
    } catch (error) {
        next(error); // 傳遞錯誤給 Express 的錯誤處理中間件
    }
});

export default router;
