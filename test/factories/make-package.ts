import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Address } from '@/domain/customer/entities/address'
import { PackageProps } from '@/domain/customer/entities/package'
import { faker } from '@faker-js/faker'

export function makePackage(
    override: Partial<PackageProps> = {},
    id?: UniqueEntityID
) {
    const address = Address.create(
        {
            customerId: new UniqueEntityID(),
            recipientName: faker.person.firstName(),
            taxID: faker.number.int().toString(),
            address: faker.location.streetAddress(),
            complement: faker.location.secondaryAddress(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            country: faker.location.country(),
            city: faker.location.city(),
            ...override,
        },
        id
    )

    return address
}
