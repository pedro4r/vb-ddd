import { Either, left, right } from '@/core/either'
import { ParcelForwardingRepository } from '../repositories/parcel-forwarding-repository'
import { ParcelForwardingAlreadyExistsError } from './errors/student-already-exists-error'
import { ParcelForwarding } from '../../enterprise/entities/parcel-forwarding'
import { HashGenerator } from '@/core/cryptography/hash-generator'

interface RegisterParcelForwardingUseCaseRequest {
    name: string
    email: string
    password: string
}

type RegisterParcelForwardingUseCaseResponse = Either<
    ParcelForwardingAlreadyExistsError,
    {
        parcelforwarding: ParcelForwarding
    }
>

export class RegisterParcelForwardingUseCase {
    constructor(
        private parcelforwardingsRepository: ParcelForwardingRepository,
        private hashGenerator: HashGenerator
    ) {}

    async execute({
        name,
        email,
        password,
    }: RegisterParcelForwardingUseCaseRequest): Promise<RegisterParcelForwardingUseCaseResponse> {
        const parcelforwardingWithSameEmail =
            await this.parcelforwardingsRepository.findByEmail(email)

        if (parcelforwardingWithSameEmail) {
            return left(new ParcelForwardingAlreadyExistsError(email))
        }

        const hashedPassword = await this.hashGenerator.hash(password)

        const parcelforwarding = ParcelForwarding.create({
            name,
            email,
            password: hashedPassword,
        })

        await this.parcelforwardingsRepository.create(parcelforwarding)

        return right({
            parcelforwarding,
        })
    }
}
