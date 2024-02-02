import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface PackageProductInfoProps {
    packageId: UniqueEntityID
    description: string
    value: number
    quantity: number
}

export class PackageProductInfo extends Entity<PackageProductInfoProps> {
    get description() {
        return this.props.description
    }

    set description(description: string) {
        this.props.description = description
    }

    get value() {
        return this.props.value
    }

    set value(value: number) {
        this.props.value = value
    }

    get quantity() {
        return this.props.quantity
    }

    set quantity(quantity: number) {
        this.props.quantity = quantity
    }

    static create(props: PackageProductInfoProps, id?: UniqueEntityID) {
        const packageProductInfo = new PackageProductInfo(props, id)
        return packageProductInfo
    }
}
