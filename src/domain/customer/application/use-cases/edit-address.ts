import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Address } from '../../enterprise/entities/address'
import { AddressRepository } from '../repositories/address-repository'

interface EditAddressUseCaseRequest {
    addressId: string
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

type EditAddressUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {
        address: Address
    }
>

export class EditAddressUseCase {
    constructor(private addressRepository: AddressRepository) {}

    async execute({
        addressId,
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
    }: EditAddressUseCaseRequest): Promise<EditAddressUseCaseResponse> {
        const newAddress = await this.addressRepository.findById(addressId)

        if (!newAddress) {
            return left(new ResourceNotFoundError())
        }

        if (customerId !== newAddress.customerId.toString()) {
            return left(new NotAllowedError())
        }

        newAddress.recipientName = recipientName
        newAddress.taxID = taxID !== undefined ? taxID : null
        newAddress.address = address
        newAddress.complement = complement !== undefined ? complement : null
        newAddress.city = city
        newAddress.state = state
        newAddress.zipCode = zipCode
        newAddress.country = country
        newAddress.phoneNumber = phoneNumber !== undefined ? phoneNumber : null

        await this.addressRepository.save(newAddress)

        return right({
            address: newAddress,
        })
    }
}
