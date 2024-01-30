import { CheckInRepository } from '@/domain/parcel-forwarding/application/repositories/check-in-repository'
import { CheckIn } from '@/domain/parcel-forwarding/enterprise/entities/check-in'
import { InMemoryCheckInsAttachmentsRepository } from './in-memory-check-ins-attachments-repository'

export class InMemoryCheckInsRepository implements CheckInRepository {
    public items: CheckIn[] = []

    constructor(
        private checkInsAttachmentRepository: InMemoryCheckInsAttachmentsRepository
    ) {}

    async create(checkin: CheckIn) {
        this.items.push(checkin)

        await this.checkInsAttachmentRepository.createMany(
            checkin.attachments.getItems()
        )
    }
}
