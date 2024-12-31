import {ProductEntity} from "../../entities/ProductEntity";
import {ProductCreateRequest} from "../../models/product/ProductCreateRequest";

export interface IProductRepository {
    findAll(): Promise<ProductEntity[] | null>;

    create(product: ProductCreateRequest): Promise<boolean>;

    delete(id: number): Promise<boolean>
}