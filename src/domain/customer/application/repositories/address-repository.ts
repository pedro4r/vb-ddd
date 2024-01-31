import { Address } from '../../entities/address'

export abstract class AddressRepository {
    abstract findManyByCustomerId(customerId: string): Promise<Address[] | null>
    abstract findById(addressId: string): Promise<Address | null>
    abstract create(address: Address): Promise<void>
    abstract save(address: Address): Promise<void>
    abstract delete(address: Address): Promise<void>
}
