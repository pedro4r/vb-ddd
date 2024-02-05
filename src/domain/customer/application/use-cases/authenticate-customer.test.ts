import { FakeHasher } from 'test/cryptography/fake-hasher'
import { AuthenticateCustomerUseCase } from './authenticate-customer'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { InMemoryParcelsForwardingRepository } from 'test/repositories/in-memory-parcel-forwarding-repository'
import { makeCustomer } from 'test/factories/make-customer'

let inMemoryParcelsForwardingRepository: InMemoryParcelsForwardingRepository
let fakeHasher: FakeHasher
let encrypter: FakeEncrypter

let sut: AuthenticateCustomerUseCase

describe('Authenticate Parcel Forwarding', () => {
    beforeEach(() => {
        inMemoryParcelsForwardingRepository =
            new InMemoryParcelsForwardingRepository()
        fakeHasher = new FakeHasher()
        encrypter = new FakeEncrypter()

        sut = new AuthenticateCustomerUseCase(
            inMemoryParcelsForwardingRepository,
            fakeHasher,
            encrypter
        )
    })

    it('should be able to authenticate a customer', async () => {
        const customer = makeCustomer({
            email: 'johndoe@example.com',
            password: await fakeHasher.hash('123456'),
        })

        inMemoryParcelsForwardingRepository.items.push(customer)

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
