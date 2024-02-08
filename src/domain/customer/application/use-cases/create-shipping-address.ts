import { Either, right } from '@/core/either'
import { ShippingAddressRepository } from '../repositories/shipping-address-repository'
import { Address } from '@/core/value-objects/address'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ShippingAddress } from '../../enterprise/entities/shipping-address'

interface CreateAddressUseCaseRequest {
    customerId: string
    recipientName: string
    address: string
    complement?: string | null
    city: string
    state: string
    zipcode: string
    country: string
    phoneNumber?: string | null
}

type CreateAddressUseCaseResponse = Either<
    null,
    {
        shippingAddress: ShippingAddress
    }
>

export class CreateShippingAddressUseCase {
    constructor(private shippingAddressRepository: ShippingAddressRepository) {}

    async execute({
        customerId,
        recipientName,
        address,
        complement,
        city,
        state,
        zipcode,
        country,
        phoneNumber,
    }: CreateAddressUseCaseRequest): Promise<CreateAddressUseCaseResponse> {
        const addressInfo = new Address({
            address,
            complement,
            city,
            state,
            zipcode,
            country,
            phoneNumber,
        })

        const shippingAddress = ShippingAddress.create({
            customerId: new UniqueEntityID(customerId),
            recipientName,
            address: addressInfo,
        })

        await this.shippingAddressRepository.create(shippingAddress)

        return right({
            shippingAddress,
        })
    }
}
