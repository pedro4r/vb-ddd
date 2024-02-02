import { WatchedList } from '@/core/entities/watched-list'
import { PackageProductInfo } from './package-product-info'

export class PackageProductInfoList extends WatchedList<PackageProductInfo> {
    compareItems(a: PackageProductInfo, b: PackageProductInfo): boolean {
        return a.id.equals(b.id)
    }
}
