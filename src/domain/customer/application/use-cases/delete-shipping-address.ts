import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ShippingAddressRepository } from '../repositories/shipping-address-repository'

interface DeleteShippingAddressUseCaseRequest {
    addressId: string
    customerId: string
}

type DeleteShippingAddressUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    null
>

export class DeleteShippingAddressUseCase {
    constructor(private shippingAddressRepository: ShippingAddressRepository) {}

    async execute({
        addressId,
        customerId,
    }: DeleteShippingAddressUseCaseRequest): Promise<DeleteShippingAddressUseCaseResponse> {
        const shippingAddresses =
            await this.shippingAddressRepository.findManyByCustomerId(
                customerId
            )

        if (!shippingAddresses) {
            return left(new ResourceNotFoundError())
        }

        if (customerId !== shippingAddresses[0].customerId.toString()) {
            return left(new NotAllowedError())
        }

        if (shippingAddresses.length === 1) {
            return left(
                new NotAllowedError(
                    'Cannot delete shipping address when you have only one.'
                )
            )
        }

        const shippingAddress =
            await this.shippingAddressRepository.findById(addressId)

        if (!shippingAddress) {
            return left(new ResourceNotFoundError())
        }

        await this.shippingAddressRepository.delete(shippingAddress)

        return right(null)
    }
}
