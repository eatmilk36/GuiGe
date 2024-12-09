import {Router} from 'express';
import {container} from '../di-container';
import {SupplierController} from "../controllers/SupplierController";
import {authenticateToken} from "../middleware/AuthMiddleware";

const router = Router();
const authController = container.resolve(SupplierController);

router.get('/list', authenticateToken, async (req, res, next) => {
    try {
        await authController.findAll(req, res);
    } catch (error) {
        next(error); // 傳遞錯誤給 Express 的錯誤處理中間件
    }
});

export default router;
