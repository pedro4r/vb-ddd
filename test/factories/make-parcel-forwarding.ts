import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
    ParcelForwarding,
    ParcelForwardingProps,
} from '@/domain/parcel-forwarding/enterprise/entities/parcel-forwarding'
import { faker } from '@faker-js/faker'

export function makeParcelForwarding(
    override: Partial<ParcelForwardingProps> = {},
    id?: UniqueEntityID
) {
    const student = ParcelForwarding.create(
        {
            name: faker.company.buzzNoun(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            ...override,
        },
        id
    )

    return student
}
