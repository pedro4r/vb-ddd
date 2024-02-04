import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Address, AddressProps } from '@/domain/customer/enterprise/entities/address'
import { faker } from '@faker-js/faker'

export function makeAddress(
    override: Partial<AddressProps> = {},
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
