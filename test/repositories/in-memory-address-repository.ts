import { AddressRepository } from '@/domain/customer/application/repositories/address-repository'
import { Address } from '@/domain/customer/enterprise/entities/address'

export class InMemoryAddressRepository implements AddressRepository {
    public items: Address[] = []

    async findManyByCustomerId(customerId: string) {
        const addresses = this.items.filter(
            (item) => item.customerId.toString() === customerId
        )

        if (addresses.length === 0) {
            return null
        }

        return addresses
    }

    async findById(addressId: string) {
        const address = this.items.find(
            (item) => item.id.toString() === addressId
        )

        if (!address) {
            return null
        }

        return address
    }

    async create(address: Address) {
        this.items.push(address)
    }

    async save(address: Address) {
        const itemIndex = this.items.findIndex((item) => item.id === address.id)
        this.items[itemIndex] = address
    }

    async delete(address: Address) {
        const itemIndex = this.items.findIndex(
            (item) => item.id.toString() === address.id.toString()
        )
        this.items.splice(itemIndex, 1)
    }
}
