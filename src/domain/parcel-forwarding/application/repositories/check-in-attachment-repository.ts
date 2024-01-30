import { CheckInAttachment } from '../../enterprise/entities/check-in-attachment'

export abstract class CheckInAttachmentsRepository {
    abstract createMany(attachments: CheckInAttachment[]): Promise<void>
}
