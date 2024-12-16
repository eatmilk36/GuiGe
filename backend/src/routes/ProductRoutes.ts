import {Router} from 'express';
import {container} from '../di-container';
import {authenticateToken} from "../middleware/AuthMiddleware";
import {ProductController} from "../controllers/ProductController";

const router = Router();
const productController = container.resolve(ProductController);

router.get('/list', authenticateToken, async (req, res, next) => {
    try {
        await productController.findAll(req, res);
    } catch (error) {
        next(error); // 傳遞錯誤給 Express 的錯誤處理中間件
    }
});

router.post('/create', authenticateToken, async (req, res, next) => {
    try {
        await productController.create(req, res);
    } catch (error) {
        next(error); // 傳遞錯誤給 Express 的錯誤處理中間件
    }
});

export default router;
