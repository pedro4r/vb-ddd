import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { CreateAddressUseCase } from './create-address'

let inMemoryAddressRepository: InMemoryAddressRepository
let sut: CreateAddressUseCase

describe('Create Address', () => {
    beforeEach(() => {
        inMemoryAddressRepository = new InMemoryAddressRepository()
        sut = new CreateAddressUseCase(inMemoryAddressRepository)
    })

    it('should be able to create an address', async () => {
        const result = await sut.execute({
            customerId: 'A1',
            recipientName: 'John Doe',
            address: '123 Main St',
            city: 'Anytown',
            state: 'NY',
            zipCode: '12345',
            country: 'USA',
        })

        expect(result.isRight()).toBe(true)

        expect(inMemoryAddressRepository.items[0]).toEqual(
            result.value?.address
        )
    })
})
