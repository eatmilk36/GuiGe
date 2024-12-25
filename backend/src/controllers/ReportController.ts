import {Request, Response} from 'express';
import {inject, injectable} from "tsyringe";
import {IReportService} from "../services/report/IReportService";

@injectable()
export class ReportController {
    constructor(@inject("IReportService") private readonly reportService: IReportService) {
    }

    async daily(req: Request, res: Response) {
        const reports = await this.reportService.daily();

        res.status(200).json(reports);
    }
}
