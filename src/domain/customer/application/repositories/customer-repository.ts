import { Customer } from '../../entities/customer'

export abstract class CustomerRepository {
    abstract findByEmail(email: string): Promise<Customer | null>
    abstract create(parcelForwarding: Customer): Promise<void>
}
