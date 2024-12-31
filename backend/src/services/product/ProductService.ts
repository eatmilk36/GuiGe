import {inject, injectable} from "tsyringe";
import {ProductCreateRequest} from "../../models/product/ProductCreateRequest";
import {ProductEntity} from "../../entities/ProductEntity";
import {IProductRepository} from "../../repository/product/IProductRepository";
import {IProductService} from "./IProductService";

@injectable()
export class ProductService implements IProductService {
    constructor(@inject("IProductRepository") private readonly productRepository: IProductRepository) {
    }

    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository.findAll();
    }

    async create(req: ProductCreateRequest): Promise<boolean> {
        let productEntity: ProductEntity = new ProductEntity();
        productEntity.supplierId = req.supplierId;
        productEntity.name = req.name;
        productEntity.unitPrice = req.unitPrice;
        productEntity.pricingUnit = req.pricingUnit;
        productEntity.count = req.count;
        productEntity.note = req.note;

        return await this.productRepository.create(productEntity);
    }

    async deleted(id: number): Promise<boolean> {
        return await this.productRepository.delete(id);
    }
}
