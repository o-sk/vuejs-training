import { mount } from '@vue/test-utils'
import { SaLoginForm } from '@/components/molecules/SaLoginForm.vue'

describe('SaLoginForm', () => {
  describe('property', () => {
    describe('validation', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(SaLoginForm, {
          propsData: { onlogin: () => {} }
        })
        loginForm.vm.$nextTick(done)
      })

      describe('email', () => {
        describe('required', () => {
          describe('empty', () => {
            it('validation.email.required is invalid', () => {
              loginForm.setData({ email: '' })
              expect(loginForm.vm.valiation.email.required).to.equal(false)
            })
          })

          describe('set email', () => {
            it('validation.email.required is valid', () => {
              loginForm.setData({ email: 'hoge@example.com' })
              expect(loginForm.vm.valiation.email.required).to.equal(true)
            })
          })
        })

        describe('format', () => {
          describe('not email format', () => {
            it('validation.email.required is invalid', () => {
              loginForm.setData({ email: 'foobar' })
              expect(loginForm.vm.valiation.email.required).to.equal(false)
            })
          })

          describe('email format', () => {
            it('validation.email.required is valid', () => {
              loginForm.setData({ email: 'foobar@example.com' })
              expect(loginForm.vm.valiation.email.required).to.equal(true)
            })
          })
        })
      })

      describe('password', () => {
        describe('required', () => {
          describe('empty', () => {
            it('validation.password.required is invalid', () => {
              loginForm.setData({ password: '' })
              expect(loginForm.vm.valiation.password.required).to.equal(false)
            })
          })

          describe('set password', () => {
            it('validation.password.required is valid', () => {
              loginForm.setData({ password: 'password' })
              expect(loginForm.vm.valiation.password.required).to.equal(true)
            })
          })
        })
      })
    })

    describe('valid', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(SaLoginForm, {
          propsData: { onlogin: () => {} }
        })
        loginForm.vm.$nextTick(done)
      })

      describe('all ok', () => {
        it('valid', () => {
          loginForm.setData({
            email: 'foobar@example.com',
            password: 'password'
          })
          expect(loginForm.vm.valid).to.equal(true)
        })
      })

      describe('ng', () => {
        it('invalid', () => {
          loginForm.setData({
            email: 'foobar@example.com',
            password: ''
          })
          expect(loginForm.vm.valid).to.equal(false)
        })
      })
    })

    describe('disableLoginAction', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(SaLoginForm, {
          propsData: { onlogin: () => {} }
        })
        loginForm.vm.$nextTick(done)
      })

      describe('invalid', () => {
        it('disable login', () => {
          loginForm.setData({
            email: 'foobar@example.com',
            password: ''
          })
          expect(loginForm.vm.disableLoginAction).to.equal(true)
        })
      })

      describe('valid and not progress', () => {
        it('enable login', () => {
          loginForm.setData({
            email: 'foobar@example.com',
            password: 'password'
          })
          expect(loginForm.vm.disableLoginAction).to.equal(false)
        })
      })

      describe('valid and progress', () => {
        it('disable login', () => {
          loginForm.setData({
            email: 'foobar@example.com',
            password: 'password',
            progress: true
          })
          expect(loginForm.vm.disableLoginAction).to.equal(true)
        })
      })
    })

    describe('onlogin', () => {
      let loginForm
      let onloginStub
      beforeEach(done => {
        onloginStub = sinon.stub()
        loginForm = mount(SaLoginForm, {
          propsData: { onlogin: onloginStub }
        })
        loginForm.setData({
          email: 'foobar@example.com',
          password: 'password'
        })
        loginForm.vm.$nextTick(done)
      })

      describe('resolve', () => {
        it('resolved', done => {
          onloginStub.resolves()

          loginForm.find('button').trigger('click')
          expect(onloginStub.called).to.equal(false)
          expect(loginForm.vm.error).to.equal('')
          expect(loginForm.vm.disableLoginAction).to.equal(true)

          loginForm.vm.$nextTick(() => {
            expect(onloginStub.called).to.equal(true)
            const authInfo = onloginStub.args[0][0]
            expect(authInfo.email).to.equal(loginForm.vm.email)
            expect(authInfo.password).to.equal(loginForm.vm.password)
            loginForm.vm.$nextTick(() => {
              expect(loginForm.vm.error).to.equal('')
              expect(loginForm.vm.disableLoginAction).to.equal(false)
              done()
            })
          })
        })
      })

      describe('reject', () => {
        it('rejected', done => {
          onloginStub.rejects(new Error('login error!'))

          loginForm.find('button').trigger('click')
          expect(onloginStub.called).to.equal(false)
          expect(loginForm.vm.error).to.equal('')
          expect(loginForm.vm.disableLoginAction).to.equal(true)

          loginForm.vm.$nextTick(() => {
            expect(onloginStub.called).to.equal(true)
            const authInfo = onloginStub.args[0][0]
            expect(authInfo.email).to.equal(loginForm.vm.email)
            expect(authInfo.password).to.equal(loginForm.vm.password)
            loginForm.vm.$nextTick(() => {
              expect(loginForm.vm.error).to.equal('login error!')
              expect(loginForm.vm.disableLoginAction).to.equal(false)
              done()
            })
          })
        })
      })
    })
  })
})
