import {ProductEntity} from "../../entities/ProductEntity";
import {ProductCreateRequest} from "../../models/product/ProductCreateRequest";

export interface IProductService {
    findAll(): Promise<ProductEntity[]>;

    create(req: ProductCreateRequest): Promise<boolean>
}
