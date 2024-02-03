import { PackageRepository } from '@/domain/customer/application/repositories/package-repository'
import { Package } from '@/domain/customer/entities/package'

export class InMemoryPackageRepository implements PackageRepository {
    public items: Package[] = []

    async create(pkg: Package) {
        this.items.push(pkg)
    }

    async findById(id: string) {
        const pkg = this.items.find((pkg) => pkg.id.toString() === id)
        if (!pkg) {
            return null
        }
        return pkg
    }

    async save(pkg: Package) {
        console.log(pkg.id.toString())
        console.log(this.items[0].id.toString())
        const index = this.items.findIndex((item) => item.id.equals(pkg.id))
        this.items[index] = pkg
    }
}
