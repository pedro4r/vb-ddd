import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { EditAddressUseCase } from './edit-address'
import { makeAddress } from 'test/factories/make-address'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAddressRepository: InMemoryAddressRepository
let sut: EditAddressUseCase

describe('Edit Address', () => {
    beforeEach(() => {
        inMemoryAddressRepository = new InMemoryAddressRepository()
        sut = new EditAddressUseCase(inMemoryAddressRepository)
    })

    it('should be able to edit an address', async () => {
        const newAddress = makeAddress(
            {
                customerId: new UniqueEntityID('customer-1'),
            },
            new UniqueEntityID('check-in-1')
        )

        await inMemoryAddressRepository.create(newAddress)

        await sut.execute({
            addressId: newAddress.id.toValue(),
            customerId: newAddress.customerId.toValue(),
            recipientName: 'New recipient name',
            taxID: 'New taxID',
            address: 'New address',
            complement: 'New complement',
            city: 'New city',
            state: 'New state',
            zipCode: 'New zipCode',
            country: 'New country',
            phoneNumber: 'New phoneNumber',
        })

        expect(inMemoryAddressRepository.items[0]).toMatchObject({
            taxID: 'New taxID',
        })
    })

    it('should be able to edit an address from another user', async () => {
        const newAddress = makeAddress(
            {
                customerId: new UniqueEntityID('customer-1'),
            },
            new UniqueEntityID('check-in-1')
        )

        await inMemoryAddressRepository.create(newAddress)

        const result = await sut.execute({
            addressId: newAddress.id.toValue(),
            customerId: 'another-customer-id',
            recipientName: 'New recipient name',
            taxID: 'New taxID',
            address: 'New address',
            complement: 'New complement',
            city: 'New city',
            state: 'New state',
            zipCode: 'New zipCode',
            country: 'New country',
            phoneNumber: 'New phoneNumber',
        })

        expect(result.isLeft).toBeTruthy()
    })
})
