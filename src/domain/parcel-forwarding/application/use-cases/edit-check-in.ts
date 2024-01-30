import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CheckIn } from '../../enterprise/entities/check-in'
import { CheckInAttachment } from '../../enterprise/entities/check-in-attachment'
import { CheckInAttachmentList } from '../../enterprise/entities/check-in-attachment-list'
import { Either, left, right } from '@/core/either'
import { CheckInRepository } from '../repositories/check-in-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface EditCheckInUseCaseRequest {
    checkInId: string
    details?: string
    attachmentsIds: string[]
}

type EditCheckInUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {
        checkin: CheckIn
    }
>

export class EditCheckInUseCase {
    constructor(private checkInRepository: CheckInRepository) {}

    async execute({
        checkInId,
        details,
        attachmentsIds,
    }: EditCheckInUseCaseRequest): Promise<EditCheckInUseCaseResponse> {
        const checkin = await this.checkInRepository.findById(checkInId)

        if (!checkin) {
            return left(new ResourceNotFoundError())
        }

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
