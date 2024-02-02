import { Package } from '../../entities/package'

export abstract class PackageRepository {
    abstract create(pkg: Package): Promise<void>
}
