import { InMemoryForwardingAddressRepository } from 'test/repositories/in-memory-forwarding-address-repository'
import { EditForwardingAddressUseCase } from './edit-forwarding-address'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeForwardingAddress } from 'test/factories/make-forwarding-address'

let inMemoryForwardingAddressRepository: InMemoryForwardingAddressRepository
let sut: EditForwardingAddressUseCase

describe('Edit Forwarding Address', () => {
    beforeEach(() => {
        inMemoryForwardingAddressRepository =
            new InMemoryForwardingAddressRepository()
        sut = new EditForwardingAddressUseCase(
            inMemoryForwardingAddressRepository
        )
    })

    it('should be able to edit a forwarding address', async () => {
        const newForwardingAddress = makeForwardingAddress(
            {
                parcelForwardingId: new UniqueEntityID('parcel-forwarding-1'),
            },
            new UniqueEntityID('forwarding-address-1')
        )

        await inMemoryForwardingAddressRepository.create(newForwardingAddress)

        await sut.execute({
            forwardingAddressId: newForwardingAddress.id.toString(),
            parcelForwardingId:
                newForwardingAddress.parcelForwardingId.toString(),
            address: 'New address',
            complement: 'New complement',
            city: 'New city',
            state: 'New state',
            zipcode: 'New zipcode',
            country: 'New country',
            phoneNumber: 'New phoneNumber',
        })

        expect(
            inMemoryForwardingAddressRepository.items[0].address
        ).toMatchObject({
            zipcode: 'New zipcode',
        })
    })

    it('should be able to edit a forwarding address from another parcel forwarding', async () => {
        const newForwardingAddress = makeForwardingAddress(
            {
                parcelForwardingId: new UniqueEntityID('parcel-forwarding-1'),
            },
            new UniqueEntityID('forwarding-address-1')
        )

        await inMemoryForwardingAddressRepository.create(newForwardingAddress)

        const result = await sut.execute({
            forwardingAddressId: newForwardingAddress.id.toString(),
            parcelForwardingId: 'another-customer-id',
            address: 'New address',
            complement: 'New complement',
            city: 'New city',
            state: 'New state',
            zipcode: 'New zipcode',
            country: 'New country',
            phoneNumber: 'New phoneNumber',
        })

        expect(result.isLeft).toBeTruthy()
    })
})
