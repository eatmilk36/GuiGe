export interface IReportRepository {
    daily(stall: number): Promise<any[]>
}