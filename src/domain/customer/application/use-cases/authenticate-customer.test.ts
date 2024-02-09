import { FakeHasher } from 'test/cryptography/fake-hasher'
import { AuthenticateCustomerUseCase } from './authenticate-customer'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { makeCustomer } from 'test/factories/make-customer'
import { InMemoryCustomersRepository } from 'test/repositories/in-memory-customer-repository'

let inMemoryCustomersRepository: InMemoryCustomersRepository
let fakeHasher: FakeHasher
let encrypter: FakeEncrypter

let sut: AuthenticateCustomerUseCase

describe('Authenticate Parcel Forwarding', () => {
    beforeEach(() => {
        inMemoryCustomersRepository = new InMemoryCustomersRepository()
        fakeHasher = new FakeHasher()
        encrypter = new FakeEncrypter()

        sut = new AuthenticateCustomerUseCase(
            inMemoryCustomersRepository,
            fakeHasher,
            encrypter
        )
    })

    it('should be able to authenticate a customer', async () => {
        const customer = makeCustomer({
            email: 'johndoe@example.com',
            password: await fakeHasher.hash('123456'),
        })

        inMemoryCustomersRepository.items.push(customer)

        const result = await sut.execute({
            email: 'johndoe@example.com',
            password: '123456',
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            accessToken: expect.any(String),
        })
    })
})
