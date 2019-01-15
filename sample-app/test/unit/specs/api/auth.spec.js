import axios from 'axios'

const mockAuth = adapter => {
  const injector = require('inject-loader!@/api/auth')
  const clientMock = injector({
    './client': axios.create({ adapter })
  })
  return clientMock.default
}

describe('Auth API', () => {
  describe('login', () => {
    const token = '1234567890abcxyz'
    const userId = 1
    const address = 'foobar@example.com'
    const password = 'password'

    describe('success', () => {
      it('get token and userId', done => {
        const adapter = config => {
          return new Promise((resolve, reject) => {
            resolve({ data: { token, userId }, status: 200 })
          })
        }

        const auth = mockAuth(adapter)
        auth.login({ address, password })
          .then(res => {
            expect(res.token).to.equal(token)
            expect(res.userId).to.equal(userId)
          })
          .then(done)
      })
    })

    describe('failure', () => {
      it('get error message', done => {
        const message = 'failed login'
        const adapter = config => {
          return new Promise((resolve, reject) => {
            const err = new Error(message)
            err.response = { data: { message }, status: 401 }
          })
        }

        const auth = mockAuth(adapter)
        auth.login({ address, password })
          .catch(err => {
            expect(err.message).to.equal(message)
          })
          .then(done)
      })
    })
  })
})
