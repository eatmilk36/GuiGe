export interface ProductCreateRequest {
    supplierId: number;
    name: string;
    pricingUnit: string;
    unitPrice: number;
    count: number;
    note: string;
}
