import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repository'
import { EditPackagesUseCase } from './edit-package'

let inMemoryPackageRepository: InMemoryPackageRepository
let sut: EditPackagesUseCase

describe('Edit Package', () => {
    beforeEach(() => {
        inMemoryPackageRepository = new InMemoryPackageRepository()
        sut = new EditPackagesUseCase(inMemoryPackageRepository)
    })

    it('should be able to edit package', async () => {
        const newPackage = makePackage(
            {
                customerId: new UniqueEntityID('customer-1'),
            },
            new UniqueEntityID('check-in-1')
        )

        await inMemoryPackageRepository.create(newPackage)

        await sut.execute({
            packageId: newPackage.id.toValue(),
            customerId: newPackage.customerId.toValue(),
            recipientName: 'New recipient name',
            taxID: 'New taxID',
            package: 'New package',
            complement: 'New complement',
            city: 'New city',
            state: 'New state',
            zipCode: 'New zipCode',
            country: 'New country',
            phoneNumber: 'New phoneNumber',
        })

        expect(inMemoryPackageRepository.items[0]).toMatchObject({
            taxID: 'New taxID',
        })
    })
})
