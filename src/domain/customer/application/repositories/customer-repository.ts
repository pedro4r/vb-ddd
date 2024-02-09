import { Customer } from '../../enterprise/entities/customer'

export abstract class CustomerRepository {
    abstract findByEmail(email: string): Promise<Customer | null>
    abstract create(customer: Customer): Promise<void>
}
