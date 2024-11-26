import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {UserService} from '../services/UserService';
import {UserRepository} from '../repository/UserRepository'

let userService: UserService;
userService = new UserService(new UserRepository());
const SECRET_KEY = 'your_jwt_secret';

export class AuthController {
    async login(req: Request, res: Response) {
        const { username, password } = req.body;
        const isValid = await userService.validateUser(username, password);
        if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    }

    async register(req: Request, res: Response) {
        const { username, password } = req.body;
        try {
            await userService.register(username, password);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(400).json({ message: "error" });
        }
    }
}
