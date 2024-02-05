import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { AuthenticateParcelForwardingUseCase } from './authenticate-parcel-forwarding'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryParcelsForwardingRepository } from 'test/repositories/in-memory-parcel-forwarding-repository'
import { makeParcelForwarding } from 'test/factories/make-parcel-forwarding'

let inMemoryParcelsForwardingRepository: InMemoryParcelsForwardingRepository
let fakeHasher: FakeHasher
let encrypter: FakeEncrypter

let sut: AuthenticateParcelForwardingUseCase

describe('Authenticate Parcel Forwarding', () => {
    beforeEach(() => {
        inMemoryParcelsForwardingRepository =
            new InMemoryParcelsForwardingRepository()
        fakeHasher = new FakeHasher()
        encrypter = new FakeEncrypter()

        sut = new AuthenticateParcelForwardingUseCase(
            inMemoryParcelsForwardingRepository,
            fakeHasher,
            encrypter
        )
    })

    it('should be able to authenticate a parcelforwarding', async () => {
        const parcelforwarding = makeParcelForwarding({
            email: 'johndoe@example.com',
            password: await fakeHasher.hash('123456'),
        })

        inMemoryParcelsForwardingRepository.items.push(parcelforwarding)

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
