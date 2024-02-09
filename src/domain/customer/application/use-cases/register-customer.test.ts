import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryCustomersRepository } from 'test/repositories/in-memory-customer-repository'
import { RegisterCustomerUseCase } from './register-customer'

let inMemoryCustomerRepository: InMemoryCustomersRepository
let fakeHasher: FakeHasher

let sut: RegisterCustomerUseCase

describe('Register Customer', () => {
    beforeEach(() => {
        inMemoryCustomerRepository = new InMemoryCustomersRepository()
        fakeHasher = new FakeHasher()

        sut = new RegisterCustomerUseCase(
            inMemoryCustomerRepository,
            fakeHasher
        )
    })

    it('should be able to register a new customer', async () => {
        const result = await sut.execute({
            parcelForwardingId: '1',
            name: 'Pedro Requiao',
            email: 'pedro@example.com',
            password: '123456',
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            customer: inMemoryCustomerRepository.items[0],
        })
    })

    it('should hash customer password upon registration', async () => {
        const result = await sut.execute({
            parcelForwardingId: '1',
            name: 'Pedro Requiao',
            email: 'pedro@example.com',
            password: '123456',
        })

        const hashedPassword = await fakeHasher.hash('123456')

        expect(result.isRight()).toBe(true)
        expect(inMemoryCustomerRepository.items[0].password).toEqual(
            hashedPassword
        )
    })
})
