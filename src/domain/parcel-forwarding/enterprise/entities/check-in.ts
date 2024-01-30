import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/opitional'
import { CheckInAttachmentList } from './check-in-attachment-list'

export interface CheckInProps {
    parcelForwardingId: UniqueEntityID
    customerId: UniqueEntityID
    details?: string | null
    attachments: CheckInAttachmentList
    createdAt: Date
    updatedAt?: Date | null
}

export class CheckIn extends Entity<CheckInProps> {
    get parcelForwardingId() {
        return this.props.parcelForwardingId
    }

    get customerId() {
        return this.props.customerId
    }

    get details() {
        if (!this.props.details) {
            return ''
        }
        return this.props.details
    }

    set details(details: string) {
        this.props.details = details
        this.touch()
    }

    get attachments() {
        return this.props.attachments
    }

    set attachments(attachments: CheckInAttachmentList) {
        this.props.attachments = attachments
        this.touch()
    }

    get createdAt() {
        return this.props.createdAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    static create(
        props: Optional<CheckInProps, 'createdAt' | 'attachments'>,
        id?: UniqueEntityID
    ) {
        const checkin = new CheckIn(
            {
                ...props,
                attachments: props.attachments ?? new CheckInAttachmentList(),
                createdAt: props.createdAt ?? new Date(),
            },
            id
        )

        return checkin
    }
}
