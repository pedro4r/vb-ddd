import { Either, left, right } from '@/core/either'
import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists-error'
import { Customer } from '../../enterprise/entities/customer'
import { CustomerRepository } from '../repositories/customer-repository'
import { HashGenerator } from '@/core/cryptography/hash-generator'

interface RegisterCustomerUseCaseRequest {
    name: string
    email: string
    password: string
}

type RegisterCustomerUseCaseResponse = Either<
    UserAlreadyExistsError,
    {
        customer: Customer
    }
>

export class RegisterCustomerUseCase {
    constructor(
        private customersRepository: CustomerRepository,
        private hashGenerator: HashGenerator
    ) {}

    async execute({
        name,
        email,
        password,
    }: RegisterCustomerUseCaseRequest): Promise<RegisterCustomerUseCaseResponse> {
        const customerWithSameEmail =
            await this.customersRepository.findByEmail(email)

        if (customerWithSameEmail) {
            return left(new UserAlreadyExistsError(email))
        }

        const hashedPassword = await this.hashGenerator.hash(password)

        const customer = Customer.create({
            name,
            email,
            password: hashedPassword,
        })

        await this.customersRepository.create(customer)

        return right({
            customer,
        })
    }
}