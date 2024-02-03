import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repository'
import { makePackage } from 'test/factories/make-package'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchPackageUseCase } from './fetch-package'
import { InMemoryCustomsDeclarationRepository } from 'test/repositories/in-memory-customs-declaration-repository'
import { Package } from '../../entities/package'

let inMemoryCustomsDeclarationRepository: InMemoryCustomsDeclarationRepository
let inMemoryPackageRepository: InMemoryPackageRepository
let sut: FetchPackageUseCase

describe('Get an Package', () => {
    beforeEach(() => {
        inMemoryCustomsDeclarationRepository =
            new InMemoryCustomsDeclarationRepository()
        inMemoryPackageRepository = new InMemoryPackageRepository(
            inMemoryCustomsDeclarationRepository
        )
        sut = new FetchPackageUseCase(inMemoryPackageRepository)
    })

    it('should be able to fetch packages', async () => {
        const pkg1 = makePackage(
            {
                customerId: new UniqueEntityID('customer-1'),
                checkInsId: [
                    new UniqueEntityID('checkin-1'),
                    new UniqueEntityID('checkin-2'),
                ],
            },
            new UniqueEntityID('package-1')
        )

        const pk2 = makePackage(
            {
                customerId: new UniqueEntityID('customer-1'),
                checkInsId: [
                    new UniqueEntityID('checkin-1'),
                    new UniqueEntityID('checkin-3'),
                ],
            },
            new UniqueEntityID('package-2')
        )

        const pkg3 = makePackage(
            {
                customerId: new UniqueEntityID('customer-2'),
                checkInsId: [
                    new UniqueEntityID('checkin-4'),
                    new UniqueEntityID('checkin-5'),
                ],
            },
            new UniqueEntityID('package-3')
        )

        inMemoryPackageRepository.items.push(pkg1)
        inMemoryPackageRepository.items.push(pk2)
        inMemoryPackageRepository.items.push(pkg3)

        const result = await sut.execute({
            customerId: 'customer-1',
        })

        expect(result.isRight()).toBeTruthy()

        expect(
            (result.value as { packages: Package[] }).packages.length
        ).toEqual(2)
        expect(inMemoryPackageRepository.items[0].checkInsId).toEqual([
            expect.objectContaining({ value: 'checkin-1' }),
            expect.objectContaining({ value: 'checkin-2' }),
        ])

        expect(inMemoryPackageRepository.items[0].customerId).toEqual(
            new UniqueEntityID('customer-1')
        )
    })
})
