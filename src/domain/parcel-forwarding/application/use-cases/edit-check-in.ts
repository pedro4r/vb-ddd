import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CheckIn } from '../../enterprise/entities/check-in'
import { CheckInAttachment } from '../../enterprise/entities/check-in-attachment'
import { Either, left, right } from '@/core/either'
import { CheckInRepository } from '../repositories/check-in-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { CheckInAttachmentsRepository } from '../repositories/check-in-attachment-repository'
import { CheckInAttachmentList } from '../../enterprise/entities/check-in-attachment-list'

interface EditCheckInUseCaseRequest {
    checkInId: string
    details?: string | null
    attachmentsIds: string[]
}

type EditCheckInUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {
        checkin: CheckIn
    }
>

export class EditCheckInUseCase {
    constructor(
        private checkInRepository: CheckInRepository,
        private checkInAttachmentsRepository: CheckInAttachmentsRepository
    ) {}

    async execute({
        checkInId,
        details,
        attachmentsIds,
    }: EditCheckInUseCaseRequest): Promise<EditCheckInUseCaseResponse> {
        const checkin = await this.checkInRepository.findById(checkInId)

        if (!checkin) {
            return left(new ResourceNotFoundError())
        }

        const currentCheckinAttachments =
            await this.checkInAttachmentsRepository.findManyByCheckInId(
                checkInId
            )

        const checkInAttachmentList = new CheckInAttachmentList(
            currentCheckinAttachments
        )

        const checkInAttachments = attachmentsIds.map((attachmentId) => {
            return CheckInAttachment.create({
                attachmentId: new UniqueEntityID(attachmentId),
                checkInId: checkin.id,
            })
        })

        checkInAttachmentList.update(checkInAttachments)

        checkin.attachments = checkInAttachmentList
        details ? (checkin.details = details) : (details = null)

        await this.checkInRepository.save(checkin)

        return right({
            checkin,
        })
    }
}
