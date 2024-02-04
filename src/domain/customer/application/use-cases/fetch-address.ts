import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { AddressRepository } from '../repositories/address-repository'
import { Address } from '../../enterprise/entities/address'

interface FetchAddressUseCaseRequest {
    customerId: string
}

type FetchAddressUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError | null,
    {
        addresses: Address[]
    }
>

export class FetchAddressUseCase {
    constructor(private addressRepository: AddressRepository) {}

    async execute({
        customerId,
    }: FetchAddressUseCaseRequest): Promise<FetchAddressUseCaseResponse> {
        const addresses =
            await this.addressRepository.findManyByCustomerId(customerId)

        if (!addresses) {
            return left(new ResourceNotFoundError())
        }

        if (customerId !== addresses[0]?.customerId.toString()) {
            return left(new NotAllowedError())
        }

        return right({
            addresses,
        })
    }
}
