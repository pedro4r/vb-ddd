import { CheckInAttachmentsRepository } from '@/domain/parcel-forwarding/application/repositories/check-in-attachment-repository'
import { CheckInAttachment } from '@/domain/parcel-forwarding/enterprise/entities/check-in-attachment'

export class InMemoryCheckInsAttachmentsRepository
    implements CheckInAttachmentsRepository
{
    public items: CheckInAttachment[] = []

    async createMany(attachments: CheckInAttachment[]): Promise<void> {
        this.items.push(...attachments)
    }
}
