import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { makeAddress } from 'test/factories/make-address'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteAddressUseCase } from './delete-address'

let inMemoryAddressRepository: InMemoryAddressRepository
let sut: DeleteAddressUseCase

describe('Delete an Address', () => {
    beforeEach(() => {
        inMemoryAddressRepository = new InMemoryAddressRepository()
        sut = new DeleteAddressUseCase(inMemoryAddressRepository)
    })

    it('should be able to delete an address', async () => {
        const address1 = makeAddress(
            {
                customerId: new UniqueEntityID('customer-1'),
            },
            new UniqueEntityID('address-1')
        )

        const address2 = makeAddress(
            {
                customerId: new UniqueEntityID('customer-1'),
            },
            new UniqueEntityID('address-2')
        )

        inMemoryAddressRepository.items.push(address1)
        inMemoryAddressRepository.items.push(address2)

        await sut.execute({
            addressId: address1.id.toString(),
            customerId: address1.customerId.toString(),
        })

        expect(inMemoryAddressRepository.items.length === 1).toBeTruthy()
        expect(inMemoryAddressRepository.items[0]).toEqual(address2)
    })

    it('not should be able to delete an address when there is only one last', async () => {
        const address = makeAddress(
            {
                customerId: new UniqueEntityID('customer-1'),
            },
            new UniqueEntityID('address-1')
        )

        inMemoryAddressRepository.items.push(address)

        const result = await sut.execute({
            addressId: address.id.toString(),
            customerId: address.customerId.toString(),
        })

        expect(result.isLeft).toBeTruthy()
        expect(inMemoryAddressRepository.items.length === 1).toBeTruthy()
    })

    it('not should be able to delete an address from another customer', async () => {
        const address = makeAddress(
            {
                customerId: new UniqueEntityID('customer-1'),
            },
            new UniqueEntityID('address-1')
        )

        inMemoryAddressRepository.items.push(address)

        const result = await sut.execute({
            addressId: address.id.toString(),
            customerId: 'customer-2',
        })

        expect(result.isLeft).toBeTruthy()
        expect(inMemoryAddressRepository.items.length === 1).toBeTruthy()
    })
})
