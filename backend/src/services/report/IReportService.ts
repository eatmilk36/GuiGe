export interface IReportService {
    daily(stall: number, date: string): Promise<any[]>;
}
