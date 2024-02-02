import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/opitional'

export interface PackageProps {
    customerId: UniqueEntityID
    parcelForwardingId: UniqueEntityID
    freightProviderId?: UniqueEntityID
    addressId: UniqueEntityID
    checkInsId: UniqueEntityID[]
    packageProductsInfoId?: UniqueEntityID[]
    weight?: number | null
    hasBattery: boolean
    trackingNumber?: string | null
    isShipped?: boolean
    createdAt: Date
    updatedAt?: Date
}

export class Package extends Entity<PackageProps> {
    static create(
        props: Optional<PackageProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const pkg = new Package(
            {
                ...props,
                createdAt: props.createdAt ?? new Date(),
            },
            id
        )

        return pkg
    }
}
