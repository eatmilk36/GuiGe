export interface IReportRepository {
    daily(stall: number, date: string): Promise<any[]>
}