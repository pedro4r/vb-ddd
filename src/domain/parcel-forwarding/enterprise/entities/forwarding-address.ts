import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/opitional'
import { Address } from '@/core/value-objects/address'

export interface ForwardingAddressProps {
    parcelForwardingId: UniqueEntityID
    address: Address
    createdAt: Date
    updatedAt?: Date | null
}

export class ForwardingAddress extends Entity<ForwardingAddressProps> {
    get parcelForwardingId() {
        return this.props.parcelForwardingId
    }

    get address() {
        return this.props.address
    }

    set address(address: Address) {
        this.props.address = address
        this.touch()
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt ?? null
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    static create(
        props: Optional<ForwardingAddressProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const forwardingAddress = new ForwardingAddress(
            {
                ...props,
                createdAt: props.createdAt ?? new Date(),
            },
            id
        )

        return forwardingAddress
    }
}
