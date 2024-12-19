import {Request, Response} from 'express';
import {inject, injectable} from "tsyringe";
import {IStaffService} from "../services/staff/IStaffService";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";
import {StaffCreateRequest} from "../models/staff/StaffCreateRequest";

@injectable()
export class StaffController {
    constructor(@inject("IStaffService") private readonly staffService: IStaffService) {
    }

    async findAll(req: Request, res: Response) {
        const staffs = await this.staffService.findAll();

        res.status(200).json(staffs);
    }

    async create(req: Request, res: Response) {
        const dto = plainToInstance(StaffCreateRequest, req.body);

        const errors = await validate(dto);
        if (errors.length > 0) {
            const messages = errors.map(err => Object.values(err.constraints || {}).join(", "));
            return res.status(400).json({message: messages});
        }

        try {
            let isSuccess = await this.staffService.create(dto);
            if (isSuccess) {
                res.status(201).json({message: 'StaffEntity created successfully'});
                return;
            }
            res.status(400).json({message: 'StaffEntity already exists'});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }
}
