import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import SaLoginView from '@/components/templates/SaLoginView.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SaLoginView', () => {
  let actions
  let $router
  let store
  let LoginFormComponentStub

  const triggerLogin = (loginView, target) => {
    const loginForm = loginView.fint(target)
    loginForm.vm.onlogin('foobar@exeample.com', 'password')
  }

  beforeEach(() => {
    LoginFormComponentStub = {
      name: 'SaLoginForm',
      props: ['onlogin'],
      render: h => h('p', ['login form'])
    }
    $router = {
      push: sinon.spy()
    }
    actions = {
      login: sinon.stub()
    }
    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  describe('login', () => {
    let loginView
    describe('success', () => {
      beforeEach(() => {
        loginView = mount(SaLoginView, {
          mocks: { $router },
          stubs: {
            'sa-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })
      })
      it('redirect root', done => {
        actions.login.resolves()
        triggerLogin(loginView, LoginFormComponentStub)
        loginView.vm.$nextTick(() => {
          expect($router.push.called).to.equal(true)
          expect($router.push.args[0][0].path).to.equal('/')
          done()
        })
      })
    })

    describe('failure', () => {
      beforeEach(() => {
        loginView = mount(SaLoginView, {
          stubs: {
            'sa-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })
        sinon.spy(loginView.vm, 'throwReject')
      })
      afterEach(() => {
        loginView.vm.throwReject.restore()
      })
      it('error', done => {
        const message = 'login failed'
        actions.login.rejects(new Error(message))
        triggerLogin(loginView, LoginFormComponentStub)
        loginView.vm.$nextTick(() => {
          const callInfo = loginView.vm.throwReject
          expect(callInfo.called).to.equal(true)
          expect(callInfo.args[0][0].message).to.equal(message)
          done()
        })
      })
    })
  })
})
