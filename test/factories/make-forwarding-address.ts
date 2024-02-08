import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
    ForwardingAddress,
    ForwardingAddressProps,
} from '@/domain/parcel-forwarding/enterprise/entities/forwarding-address'
import { makeAddress } from './make-address'

export function makeForwardingAddress(
    override: Partial<ForwardingAddressProps> = {},
    id?: UniqueEntityID
) {
    const forwardingAddress = ForwardingAddress.create(
        {
            parcelForwardingId: new UniqueEntityID(),
            address: makeAddress(),
            ...override,
        },
        id
    )

    return forwardingAddress
}
