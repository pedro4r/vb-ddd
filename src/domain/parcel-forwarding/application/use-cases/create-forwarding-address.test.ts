import { InMemoryForwardingAddressRepository } from 'test/repositories/in-memory-forwarding-address-repository'
import { CreateForwardingAddressUseCase } from './create-forwarding-address'

let inMemoryForwardingAddressRepository: InMemoryForwardingAddressRepository
let sut: CreateForwardingAddressUseCase

describe('Create Forwarding Address', () => {
    beforeEach(() => {
        inMemoryForwardingAddressRepository =
            new InMemoryForwardingAddressRepository()
        sut = new CreateForwardingAddressUseCase(
            inMemoryForwardingAddressRepository
        )
    })

    it('should be able to create a forwarding address', async () => {
        const result = await sut.execute({
            parcelForwardingId: '1',
            address: '1234 Main St',
            complement: 'Apt 123',
            city: 'Springfield',
            state: 'IL',
            zipcode: '62701',
            country: 'USA',
            phoneNumber: '555-555-5555',
        })

        expect(result.isRight()).toBe(true)

        expect(inMemoryForwardingAddressRepository.items[0]).toEqual(
            result.value?.forwardingAddress
        )
    })
})
