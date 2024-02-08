import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ForwardingAddress } from '../../enterprise/entities/forwarding-address'
import { ForwardingAddressRepository } from '../repositories/forwarding-address-repository'
import { Address } from '@/core/value-objects/address'

interface EditForwardingAddressUseCaseRequest {
    parcelForwardingId: string
    forwardingAddressId: string
    address: string
    complement?: string | null
    city: string
    state: string
    zipcode: string
    country: string
    phoneNumber?: string | null
}

type EditForwardingAddressUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {
        forwardingAddress: ForwardingAddress
    }
>

export class EditForwardingAddressUseCase {
    constructor(
        private forwardingAddressRepository: ForwardingAddressRepository
    ) {}

    async execute({
        parcelForwardingId,
        forwardingAddressId,
        address,
        complement,
        city,
        state,
        zipcode,
        country,
        phoneNumber,
    }: EditForwardingAddressUseCaseRequest): Promise<EditForwardingAddressUseCaseResponse> {
        const forwardingAddress =
            await this.forwardingAddressRepository.findById(forwardingAddressId)

        if (!forwardingAddress) {
            return left(new ResourceNotFoundError())
        }

        if (
            parcelForwardingId !==
            forwardingAddress.parcelForwardingId.toString()
        ) {
            return left(new NotAllowedError())
        }

        const newAddress = new Address({
            address,
            city,
            state,
            zipcode,
            country,
            complement,
            phoneNumber,
        })

        forwardingAddress.address = newAddress

        await this.forwardingAddressRepository.save(forwardingAddress)

        return right({
            forwardingAddress,
        })
    }
}
