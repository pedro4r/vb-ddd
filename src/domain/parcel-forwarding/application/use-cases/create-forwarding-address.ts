import { Either, right } from '@/core/either'
import { ForwardingAddress } from '../../enterprise/entities/forwarding-address'
import { ForwardingAddressRepository } from '../repositories/forwarding-address-repository'
import { Address } from '@/core/value-objects/address'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CreateForwardingAddressUseCaseRequest {
    parcelForwardingId: string
    address: string
    complement?: string | null
    city: string
    state: string
    zipcode: string
    country: string
    phoneNumber?: string | null
}

type CreateForwardingAddressUseCaseResponse = Either<
    null,
    {
        forwardingAddress: ForwardingAddress
    }
>

export class CreateForwardingAddressUseCase {
    constructor(
        private forwardingAddressRepository: ForwardingAddressRepository
    ) {}

    async execute({
        parcelForwardingId,
        address,
        complement,
        city,
        state,
        zipcode,
        country,
        phoneNumber,
    }: CreateForwardingAddressUseCaseRequest): Promise<CreateForwardingAddressUseCaseResponse> {
        const addressInfo = new Address({
            address,
            complement,
            city,
            state,
            zipcode,
            country,
            phoneNumber,
        })

        const forwardingAddress = ForwardingAddress.create({
            parcelForwardingId: new UniqueEntityID(parcelForwardingId),
            address: addressInfo,
        })

        await this.forwardingAddressRepository.create(forwardingAddress)

        return right({
            forwardingAddress,
        })
    }
}
