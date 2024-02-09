import { ShippingAddressRepository } from '@/domain/customer/application/repositories/shipping-address-repository'
import { ShippingAddress } from '@/domain/customer/enterprise/entities/shipping-address'
import { InMemoryCustomersRepository } from './in-memory-customer-repository'

export class InMemoryShippingAddressRepository
    implements ShippingAddressRepository
{
    public items: ShippingAddress[] = []

    async findManyByCustomerId(customerId: string) {
        const shippingAddresses = this.items.filter(
            (item) => item.customerId.toString() === customerId
        )

        if (shippingAddresses.length === 0) {
            return null
        }

        return shippingAddresses
    }

    async findById(shippingAddressId: string) {
        const address = this.items.find(
            (item) => item.id.toString() === shippingAddressId
        )

        if (!address) {
            return null
        }

        return address
    }

    async create(shippingAddress: ShippingAddress) {
        this.items.push(shippingAddress)
    }

    async save(shippingAddress: ShippingAddress) {
        const itemIndex = this.items.findIndex(
            (item) => item.id === shippingAddress.id
        )
        this.items[itemIndex] = shippingAddress
    }

    async delete(shipppingAddress: ShippingAddress) {
        const itemIndex = this.items.findIndex(
            (item) => item.id.toString() === shipppingAddress.id.toString()
        )
        this.items.splice(itemIndex, 1)
    }
}