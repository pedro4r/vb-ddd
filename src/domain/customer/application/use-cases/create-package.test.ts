import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repository'
import { CreatePackageUseCase } from './create-package'

let inMemoryPackageRepository: InMemoryPackageRepository
let sut: CreatePackageUseCase

describe('Create Package', () => {
    beforeEach(() => {
        inMemoryPackageRepository = new InMemoryPackageRepository()
        sut = new CreatePackageUseCase(inMemoryPackageRepository)
    })

    it('should be able to create a package', async () => {
        const result = await sut.execute({
            customerId: 'customerId',
            parcelForwardingId: 'parcelForwardingId',
            addressId: 'addressId',
            checkInsId: ['checkInId1', 'checkInId2'],
            customsDeclarationId: 'customsDeclarationId',
            hasBattery: true,
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryPackageRepository.items[0]).toEqual(result.value?.pkg)
        expect(
            inMemoryPackageRepository.items[0].customerId.toString()
        ).toEqual('customerId')
    })
})
