import {inject, injectable} from "tsyringe";
import {IReportService} from "./IReportService";
import {IReportRepository} from "../../repository/report/IReportRepository";

@injectable()
export class ReportService implements IReportService {
    constructor(@inject("IReportRepository") private readonly reportRepository: IReportRepository) {
    }

    async daily(stall: number): Promise<any[]> {
        return await this.reportRepository.daily(stall);
    }
}
