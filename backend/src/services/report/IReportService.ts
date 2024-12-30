export interface IReportService {
    daily(stall: number): Promise<any[]>;
}
