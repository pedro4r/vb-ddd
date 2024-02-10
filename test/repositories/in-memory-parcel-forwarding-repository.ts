import { ParcelForwardingRepository } from '@/domain/parcel-forwarding/application/repositories/parcel-forwarding-repository'
import { ParcelForwarding } from '@/domain/parcel-forwarding/enterprise/entities/parcel-forwarding'

export class InMemoryParcelForwardingRepository
    implements ParcelForwardingRepository
{
    public items: ParcelForwarding[] = []

    async findById(id: string) {
        const student = this.items.find((item) => item.id.toString() === id)

        if (!student) {
            return null
        }

        return student
    }

    async findByEmail(email: string) {
        const student = this.items.find((item) => item.email === email)

        if (!student) {
            return null
        }

        return student
    }

    async create(parcelForwarding: ParcelForwarding) {
        this.items.push(parcelForwarding)
    }
}
