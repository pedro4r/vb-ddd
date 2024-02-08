import { ForwardingAddress } from '@/domain/parcel-forwarding/enterprise/entities/forwarding-address'
import { ForwardingAddressRepository } from '@/domain/parcel-forwarding/application/repositories/forwarding-address-repository'

export class InMemoryForwardingAddressRepository
    implements ForwardingAddressRepository
{
    public items: ForwardingAddress[] = []

    async findManyByParcelForwardingId(parcelForwardingId: string) {
        const forwardingAddresses = this.items.filter(
            (item) => item.parcelForwardingId.toString() === parcelForwardingId
        )

        if (forwardingAddresses.length === 0) {
            return null
        }

        return forwardingAddresses
    }

    async findById(forwardingAddressId: string) {
        const forwardingAddress = this.items.find(
            (item) => item.id.toString() === forwardingAddressId
        )

        if (!forwardingAddress) {
            return null
        }

        return forwardingAddress
    }

    async create(forwardingAddressId: ForwardingAddress) {
        this.items.push(forwardingAddressId)
    }

    async save(forwardingAddress: ForwardingAddress) {
        const itemIndex = this.items.findIndex(
            (item) => item.id === forwardingAddress.id
        )
        this.items[itemIndex] = forwardingAddress
    }

    async delete(shipppingAddress: ForwardingAddress) {
        const itemIndex = this.items.findIndex(
            (item) => item.id.toString() === shipppingAddress.id.toString()
        )
        this.items.splice(itemIndex, 1)
    }
}
