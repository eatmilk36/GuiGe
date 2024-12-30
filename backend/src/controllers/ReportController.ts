import {Request, Response} from 'express';
import {inject, injectable} from "tsyringe";
import {IReportService} from "../services/report/IReportService";

@injectable()
export class ReportController {
    constructor(@inject("IReportService") private readonly reportService: IReportService) {
    }

    async daily(req: Request, res: Response) {
        const {stall} = req.params; // 路由參數
        const reports = await this.reportService.daily(parseInt(stall));

        res.status(200).json(reports);
    }
}
