import {Router} from 'express';
import {UserController} from '../controllers/UserController';
import {authenticateToken} from '../middleware/AuthMiddleware';
import {container} from '../di-container';

const router = Router();
const userController = container.resolve(UserController);

router.post('/register', authenticateToken, async (req, res, next) => {
    try {
        await userController.register(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/list', authenticateToken, async (req, res, next) => {
    try {
        await userController.findAll(req, res);
    } catch (error) {
        next(error);
    }
});

router.post('/delete/:id', authenticateToken, async (req, res, next) => {
    try {
        await userController.delete(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
