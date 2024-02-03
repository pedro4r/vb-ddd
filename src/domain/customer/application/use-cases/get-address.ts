import { Either, left, right } from '@/core/either'
import { Address } from '../../entities/address'
import { AddressRepository } from '../repositories/address-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface GetAddressUseCaseRequest {
    customerId: string
    addressId: string
}

type GetAddressUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError | null,
    {
        address: Address
    }
>

export class GetAddressUseCase {
    constructor(private addressRepository: AddressRepository) {}

    async execute({
        customerId,
        addressId,
    }: GetAddressUseCaseRequest): Promise<GetAddressUseCaseResponse> {
        const address = await this.addressRepository.findById(addressId)

        if (!address) {
            return left(new ResourceNotFoundError())
        }

        if (customerId !== address.customerId.toString()) {
            return left(new NotAllowedError())
        }

        return right({
            address,
        })
    }
}
