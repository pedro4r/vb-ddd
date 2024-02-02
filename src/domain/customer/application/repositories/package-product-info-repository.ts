import { PackageProductInfo } from '../../entities/package-product-info'

export abstract class PackageProductInfoRepository {
    abstract createMany(
        packageProductsInfo: PackageProductInfo[]
    ): Promise<void>
}
