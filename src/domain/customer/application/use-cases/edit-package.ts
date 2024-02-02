import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Package } from '../../entities/package'
import { PackageRepository } from '../repositories/package-repository'

interface EditPackagesRequest {
    packageId: string
    customerId: string
    parcelForwardingId: string
    addressId: string
    checkInsId: string[]
    customsDeclarationId: string
    hasBattery: boolean
}

type EditPackagesResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {
        package: Package
    }
>

export class EditPackagesUseCase {
    constructor(private packageRepository: PackageRepository) {}

    async execute({
        packageId,
        customerId,
        parcelForwardingId,
        addressId,
        checkInsId,
        customsDeclarationId,
        hasBattery,
    }: EditPackagesRequest): Promise<EditPackagesResponse> {
        const pkg = await this.packageRepository.findById(packageId)

        if (!pkg) {
            return left(new ResourceNotFoundError())
        }

        if (pkg.customerId.toString() !== customerId) {
            return left(new NotAllowedError())
        }

        const newPkg = Package.create({
            customerId: new UniqueEntityID(customerId),
            parcelForwardingId: new UniqueEntityID(parcelForwardingId),
            addressId: new UniqueEntityID(addressId),
            checkInsId: checkInsId.map((id) => new UniqueEntityID(id)),
            customsDeclarationId: new UniqueEntityID(customsDeclarationId),
            hasBattery,
        })

        await this.packageRepository.save(newPkg)

        return right({
            package: newPkg,
        })
    }
}
