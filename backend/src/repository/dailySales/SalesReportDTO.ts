export interface SalesReportDTO {
    date: string; // 日
    totalSales: number;
    type: "daily" | "monthly" | "quarterly" | "yearly"; // 區分日月季年
}