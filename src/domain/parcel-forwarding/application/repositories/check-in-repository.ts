import { CheckIn } from '../../enterprise/entities/check-in'

export abstract class CheckInRepository {
    abstract create(checkIn: CheckIn): Promise<void>
    abstract findById(id: string): Promise<CheckIn | null>
}
