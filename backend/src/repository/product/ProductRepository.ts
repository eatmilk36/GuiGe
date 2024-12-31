import {DataSource, Repository} from "typeorm";
import {inject, injectable} from "tsyringe";
import {IProductRepository} from "./IProductRepository";
import {ProductEntity} from "../../entities/ProductEntity";
import {SupplierEntity} from "../../entities/SupplierEntity";
import {ProductCreateRequest} from "../../models/product/ProductCreateRequest";

@injectable()
export class ProductRepository implements IProductRepository {
    private readonly productRepository: Repository<ProductEntity>;

    constructor(@inject(DataSource) private readonly dataSource: DataSource) {
        this.productRepository = this.dataSource.getRepository(ProductEntity);
    }

    async findAll(): Promise<ProductEntity[] | null> {
        return this.productRepository.find({
            where: {deletedAt: null}
        });
    }

    async create(product: ProductCreateRequest): Promise<boolean> {
        try {

            const supplierRepository = this.dataSource.getRepository(SupplierEntity);
            const supplier = await supplierRepository.findOneBy({id: product.supplierId});
            if (!supplier) {
                throw new Error("產品找不到");
            }

            const newProduct = this.productRepository.create({
                supplier: supplier, // 使用 supplier 而非 supplierId
                name: product.name,
                unitPrice: product.unitPrice,
                pricingUnit: product.pricingUnit,
                count: product.count,
                note: product.note,
            });

            await this.productRepository.save(newProduct);
            return true;
        } catch {
            return false;
        }
    }

    async delete(id: number): Promise<boolean> {
        const productEntity = await this.productRepository.findOneBy({id});
        if (productEntity) {
            // await this.productRepository.remove(productEntity);
            productEntity.deletedAt = new Date();
            await this.productRepository.save(productEntity);
            return true;
        } else {
            // throw new Error(`ID 為 ${id} 的產品未找到`);
            return false;
        }
    }
}