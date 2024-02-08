import { ForwardingAddress } from '../../enterprise/entities/forwarding-address'

export abstract class ForwardingAddressRepository {
    abstract findManyByParcelForwardingId(
        parcelForwardingId: string
    ): Promise<ForwardingAddress[] | null>

    abstract findById(
        ForwardingAddressId: string
    ): Promise<ForwardingAddress | null>

    abstract create(ForwardingAddress: ForwardingAddress): Promise<void>
    abstract save(ForwardingAddress: ForwardingAddress): Promise<void>
    abstract delete(ForwardingAddress: ForwardingAddress): Promise<void>
}
