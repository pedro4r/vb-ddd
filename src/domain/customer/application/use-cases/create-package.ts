import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Package } from '../../enterprise/entities/package'
import { PackageRepository } from '../repositories/package-repository'

interface CreatePackageUseCaseRequest {
    customerId: string
    parcelForwardingId: string
    addressId: string
    checkInsId: string[]
    customsDeclarationId: string
    hasBattery: boolean
}

type CreatePackageUseCaseResponse = Either<
    null,
    {
        pkg: Package
    }
>

export class CreatePackageUseCase {
    constructor(private packageRepository: PackageRepository) {}

    async execute({
        customerId,
        parcelForwardingId,
        addressId,
        checkInsId,
        customsDeclarationId,
        hasBattery,
    }: CreatePackageUseCaseRequest): Promise<CreatePackageUseCaseResponse> {
        const pkg = Package.create({
            customerId: new UniqueEntityID(customerId),
            parcelForwardingId: new UniqueEntityID(parcelForwardingId),
            addressId: new UniqueEntityID(addressId),
            checkInsId: checkInsId.map((id) => new UniqueEntityID(id)),
            customsDeclarationId: new UniqueEntityID(customsDeclarationId),
            hasBattery,
        })

        await this.packageRepository.create(pkg)

        return right({
            pkg,
        })
    }
}
