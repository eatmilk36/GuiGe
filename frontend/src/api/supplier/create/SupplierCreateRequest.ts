export interface SupplierCreateRequest {
    name: string;
    address: string;
    email: string;
    phone: string;
    isActive?: boolean;
}