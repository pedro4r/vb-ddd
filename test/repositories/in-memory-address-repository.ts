import { AddressRepository } from '@/domain/customer/application/repositories/address-repository'
import { Address } from '@/domain/customer/entities/address'

export class InMemoryAddressRepository implements AddressRepository {
    public items: Address[] = []

    findManyByCustomerId(customerId: string): Promise<Address[] | null> {
        throw new Error('Method not implemented.')
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

    delete(address: Address): Promise<void> {
        throw new Error('Method not implemented.')
    }
}
