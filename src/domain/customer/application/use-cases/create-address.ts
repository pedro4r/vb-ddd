import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, right } from '@/core/either'
import { Address } from '../../entities/address'
import { AddressRepository } from '../repositories/address-repository'

interface CreateAddressUseCaseRequest {
    customerId: string
    recipientName: string
    taxID?: string | null
    address: string
    complement?: string | null
    city: string
    state: string
    zipCode: string
    country: string
    phoneNumber?: string | null
}

type CreateAddressUseCaseResponse = Either<
    null,
    {
        address: Address
    }
>

export class CreateAddressUseCase {
    constructor(private addressRepository: AddressRepository) {}

    async execute({
        customerId,
        recipientName,
        taxID,
        address,
        complement,
        city,
        state,
        zipCode,
        country,
        phoneNumber,
    }: CreateAddressUseCaseRequest): Promise<CreateAddressUseCaseResponse> {
        const newAddress = Address.create({
            customerId: new UniqueEntityID(customerId),
            recipientName,
            taxID,
            address,
            complement,
            city,
            state,
            zipCode,
            country,
            phoneNumber,
        })

        await this.addressRepository.create(newAddress)

        return right({
            address: newAddress,
        })
    }
}
