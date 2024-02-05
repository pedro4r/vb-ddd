import { UseCaseError } from '@/core/errors/use-case-error'

export class ParcelForwardingAlreadyExistsError
    extends Error
    implements UseCaseError
{
    constructor(identifier: string) {
        super(`Parcel Forwarding "${identifier}" already exists.`)
    }
}
