import { CustomerRepository } from '@/domain/customer/application/repositories/customer-repository'
import { Customer } from '@/domain/customer/enterprise/entities/customer'

export class InMemoryCustomersRepository implements CustomerRepository {
    public items: Customer[] = []

    async findByEmail(email: string) {
        const student = this.items.find((item) => item.email === email)

        if (!student) {
            return null
        }

        return student
    }

    async create(customer: Customer) {
        this.items.push(customer)
    }
}
