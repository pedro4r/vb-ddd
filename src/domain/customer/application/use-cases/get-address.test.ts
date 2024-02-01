import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { makeAddress } from 'test/factories/make-address'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GetAddressUseCase } from './get-address'

let inMemoryAddressRepository: InMemoryAddressRepository
let sut: GetAddressUseCase

describe('Get an Address', () => {
    beforeEach(() => {
        inMemoryAddressRepository = new InMemoryAddressRepository()
        sut = new GetAddressUseCase(inMemoryAddressRepository)
    })

    it('should be able to get an address', async () => {
        const address = makeAddress(
            {
                customerId: new UniqueEntityID('customer-1'),
            },
            new UniqueEntityID('check-in-1')
        )

        inMemoryAddressRepository.items.push(address)

        const result = await sut.execute({
            addressId: address.id.toString(),
        })

        expect(result.isRight()).toBeTruthy()
        expect(inMemoryAddressRepository.items[0]).toMatchObject({
            taxID: address.taxID,
        })
    })
})
