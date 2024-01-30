import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CheckIn } from '../../enterprise/entities/check-in'
import { CheckInAttachment } from '../../enterprise/entities/check-in-attachment'
import { CheckInAttachmentList } from '../../enterprise/entities/check-in-attachment-list'
import { Either, right } from '@/core/either'
import { CheckInRepository } from '../repositories/check-in-repository'

interface CheckInUseCaseRequest {
    parcelForwardingId: string
    customerId: string
    details?: string
    attachmentsIds: string[]
}

type CheckInUseCaseResponse = Either<
    null,
    {
        checkin: CheckIn
    }
>

export class CheckInUseCase {
    constructor(private checkInRepository: CheckInRepository) {}

    async execute({
        parcelForwardingId,
        customerId,
        details,
        attachmentsIds,
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const checkin = CheckIn.create({
            parcelForwardingId: new UniqueEntityID(parcelForwardingId),
            customerId: new UniqueEntityID(customerId),
            details,
        })

        const checkInAttachments = attachmentsIds.map((attachmentId) => {
            return CheckInAttachment.create({
                checkInId: checkin.id,
                attachmentId: new UniqueEntityID(attachmentId),
            })
        })

        checkin.attachments = new CheckInAttachmentList(checkInAttachments)

        await this.checkInRepository.create(checkin)

        return right({
            checkin,
        })
    }
}
