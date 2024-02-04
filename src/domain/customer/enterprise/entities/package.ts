import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/opitional'
import { PackageCreatedEvent } from '../events/package-created-event'

export interface PackageProps {
    customerId: UniqueEntityID
    parcelForwardingId: UniqueEntityID
    freightProviderId?: UniqueEntityID | null
    addressId: UniqueEntityID
    checkInsId: UniqueEntityID[]
    customsDeclarationId?: UniqueEntityID
    weight?: number | null
    hasBattery: boolean
    trackingNumber?: string | null
    isShipped?: boolean
    createdAt: Date
    updatedAt?: Date
}

export class Package extends AggregateRoot<PackageProps> {
    get customerId() {
        return this.props.customerId
    }

    get parcelForwardingId() {
        return this.props.parcelForwardingId
    }

    get freightProviderId() {
        return this.props.freightProviderId
    }

    set freightProviderId(id: UniqueEntityID | undefined | null) {
        this.props.freightProviderId = id
        this.touch()
    }

    get addressId() {
        return this.props.addressId
    }

    set addressId(id: UniqueEntityID) {
        this.props.addressId = id
        this.touch()
    }

    get checkInsId() {
        return this.props.checkInsId
    }

    set checkInsId(ids: UniqueEntityID[]) {
        this.props.checkInsId = ids
        this.touch()
    }

    get customsDeclarationId() {
        return this.props.customsDeclarationId
    }

    set customsDeclarationId(id: UniqueEntityID | undefined) {
        this.props.customsDeclarationId = id
        this.touch()
    }

    get weight() {
        return this.props.weight
    }

    set weight(weight: number | undefined | null) {
        this.props.weight = weight
        this.touch()
    }

    get hasBattery() {
        return this.props.hasBattery
    }

    set hasBattery(hasBattery: boolean) {
        this.props.hasBattery = hasBattery
        this.touch()
    }

    get trackingNumber() {
        return this.props.trackingNumber
    }

    set trackingNumber(trackingNumber: string | undefined | null) {
        this.props.trackingNumber = trackingNumber
        this.touch()
    }

    get isShipped() {
        return this.props.isShipped
    }

    set isShipped(isShipped: boolean | undefined) {
        this.props.isShipped = isShipped
        this.touch()
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    static create(
        props: Optional<PackageProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const pkg = new Package(
            {
                ...props,
                createdAt: props.createdAt ?? new Date(),
            },
            id
        )

        const isNewPackage = !id

        if (isNewPackage) {
            pkg.addDomainEvent(new PackageCreatedEvent(pkg))
        }

        return pkg
    }
}
