export interface IReportRepository {
    daily(): Promise<any[]>
}