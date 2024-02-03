import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repository'
import { EditPackagesUseCase } from './edit-package'
import { makePackage } from 'test/factories/make-package'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryPackageRepository: InMemoryPackageRepository
let sut: EditPackagesUseCase

describe('Edit Package', () => {
    beforeEach(() => {
        inMemoryPackageRepository = new InMemoryPackageRepository()
        sut = new EditPackagesUseCase(inMemoryPackageRepository)
    })

    it('should be able to edit package', async () => {
        const newPkg = makePackage()

        await inMemoryPackageRepository.create(newPkg)

        await sut.execute({
            packageId: newPkg.id.toString(),
            customerId: newPkg.customerId.toString(),
            parcelForwardingId: newPkg.parcelForwardingId.toString(),
            addressId: 'address-2',
            checkInsId: ['checkin-2', 'checkin-3'],
            customsDeclarationId: 'customs-declaration-2',
            hasBattery: true,
        })

        expect(inMemoryPackageRepository.items[0].id.toString()).toEqual(
            newPkg.id.toString()
        )
        expect(inMemoryPackageRepository.items[0].addressId.toString()).toEqual(
            'address-2'
        )

        expect(inMemoryPackageRepository.items[0].checkInsId.length).toEqual(2)
    })
})
