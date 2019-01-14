import { mount } from '@vue/test-utils'
import { SaButton } from '@/components/atoms/SaButton.vue'

describe('SaButton', () => {
  describe('property', () => {
    describe('default', () => {
      it('button is a button tag with sa-button class', () => {
        const button = mount(SaButton)
        expect(button.is('button')).to.equal(true)
        expect(button.classes()).to.include('sa-button')
      })
    })

    describe('button', () => {
      it('button is a button tag with sa-button class', () => {
        const button = mount(SaButton, {
          propsData: { type: 'button' }
        })
        expect(button.is('button')).to.equal(true)
        expect(button.classes()).to.include('sa-button')
      })
    })

    describe('text', () => {
      it('button is a button tag with sa-button-text class', () => {
        const button = mount(SaButton, {
          propsData: { type: 'text' }
        })
        expect(button.is('button')).to.equal(true)
        expect(button.classes()).to.include('sa-button-text')
      })
    })
  })

  describe('disabled', () => {
    describe('default', () => {
      it('disabled attribute not added', () => {
        const button = mount(SaButton)
        expect(button.attributes().disabled).to.be.an('undefined')
      })
    })

    describe('true', () => {
      it('disabled attribute added', () => {
        const button = mount(SaButton, {
          propsData: { disabled: true }
        })
        expect(button.attributes().disabled).to.equal('disabled')
      })
    })

    describe('false', () => {
      it('disabled attribute added', () => {
        const button = mount(SaButton, {
          propsData: { disabled: false }
        })
        expect(button.attributes().disabled).to.be.an('undefined')
      })
    })
  })

  describe('event', () => {
    describe('click', () => {
      it('emitted', () => {
        const button = mount(SaButton)
        button.trigger('click')
        expect(button.emitted().click.length).to.equal(1)
      })
    })
  })

  describe('slot', () => {
    describe('with contents', () => {
      it('inserted', () => {
        const button = mount(SaButton, {
          slots: { default: '<p>text</p>' }
        })
        expect(button.text()).to.equal('text')
      })
    })

    describe('without contents', () => {
      it('not inserted', () => {
        const button = mount(SaButton)
        expect(button.text()).to.equal('')
      })
    })
  })
})
