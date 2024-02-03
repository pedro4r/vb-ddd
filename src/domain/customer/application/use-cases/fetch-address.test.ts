import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { makeAddress } from 'test/factories/make-address'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchAddressUseCase } from './fetch-address'
import { Address } from '../../entities/address'

let inMemoryAddressRepository: InMemoryAddressRepository
let sut: FetchAddressUseCase

describe('Get an Address', () => {
    beforeEach(() => {
        inMemoryAddressRepository = new InMemoryAddressRepository()
        sut = new FetchAddressUseCase(inMemoryAddressRepository)
    })

    it('should be able to fetch addresss', async () => {
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

        const address3 = makeAddress(
            {
                customerId: new UniqueEntityID('customer-2'),
            },
            new UniqueEntityID('address-3')
        )

        inMemoryAddressRepository.items.push(address1)
        inMemoryAddressRepository.items.push(address2)
        inMemoryAddressRepository.items.push(address3)

        const result = await sut.execute({
            customerId: 'customer-1',
        })

        expect(result.isRight()).toBeTruthy()
        expect(
            (result.value as { addresses: Address[] }).addresses.length
        ).toEqual(2)
    })

    it.skip('should not be able to fetch addresss from another customer', async () => {
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

        const result = await sut.execute({
            customerId: 'another-customer',
        })

        expect(result.isLeft()).toBeTruthy()
    })
})
