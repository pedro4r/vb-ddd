import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { AddressRepository } from '../repositories/address-repository'

interface DeleteAddressUseCaseRequest {
    addressId: string
    customerId: string
}

type DeleteAddressUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    null
>

export class DeleteAddressUseCase {
    constructor(private addressRepository: AddressRepository) {}

    async execute({
        addressId,
        customerId,
    }: DeleteAddressUseCaseRequest): Promise<DeleteAddressUseCaseResponse> {
        const addresses =
            await this.addressRepository.findManyByCustomerId(customerId)

        if (!addresses) {
            return left(new ResourceNotFoundError())
        }

        if (customerId !== addresses[0].customerId.toString()) {
            return left(new NotAllowedError())
        }

        if (addresses.length === 1) {
            return left(new NotAllowedError('Cannot delete the last address.'))
        }

        const address = await this.addressRepository.findById(addressId)

        if (!address) {
            return left(new ResourceNotFoundError())
        }

        await this.addressRepository.delete(address)

        return right(null)
    }
}
