import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/opitional'

export interface AddressProps {
    customerId: UniqueEntityID
    recipientName: string
    taxID?: string | null
    address: string
    complement?: string | null
    city: string
    state: string
    zipCode: string
    country: string
    phoneNumber?: string | null
    createdAt: Date
    updatedAt?: Date | null
}

export class Address extends Entity<AddressProps> {
    get customerId() {
        return this.props.customerId
    }

    get recipientName() {
        return this.props.recipientName
    }

    set recipientName(recipientName: string) {
        this.props.recipientName = recipientName
        this.touch()
    }

    get taxID() {
        return this.props.taxID ?? null
    }

    set taxID(taxID: string | null) {
        this.props.taxID = taxID
        this.touch()
    }

    get address() {
        return this.props.address
    }

    set address(address: string) {
        this.props.address = address
        this.touch()
    }

    get complement() {
        return this.props.complement ?? null
    }

    set complement(complement: string | null) {
        this.props.complement = complement
        this.touch()
    }

    get city() {
        return this.props.city
    }

    set city(city: string) {
        this.props.city = city
        this.touch()
    }

    get state() {
        return this.props.state
    }

    set state(state: string) {
        this.props.state = state
        this.touch()
    }

    get zipCode() {
        return this.props.zipCode
    }

    set zipCode(zipCode: string) {
        this.props.zipCode = zipCode
        this.touch()
    }

    get country() {
        return this.props.country
    }

    set country(country: string) {
        this.props.country = country
        this.touch()
    }

    get phoneNumber() {
        return this.props.phoneNumber ?? null
    }

    set phoneNumber(phoneNumber: string | null) {
        this.props.phoneNumber = phoneNumber
        this.touch()
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt ?? null
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    static create(
        props: Optional<
            AddressProps,
            'createdAt' | 'taxID' | 'complement' | 'phoneNumber'
        >,
        id?: UniqueEntityID
    ) {
        const address = new Address(
            {
                ...props,
                taxID: props.taxID ?? null,
                complement: props.complement ?? null,
                phoneNumber: props.phoneNumber ?? null,
                createdAt: props.createdAt ?? new Date(),
            },
            id
        )

        return address
    }
}
