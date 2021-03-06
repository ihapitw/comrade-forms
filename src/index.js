import './styles/index.scss'

import hyperform from 'hyperform'
hyperform.setRenderer('attachWarning', () => {
  return false
})

import utmObserver from './modules/utm-observer'

import { ComradeForm } from './modules/form'
import { optionsDefault } from './modules/const'

let instance = null

export class ComradeForms {
  constructor(options = {}) {
    if (instance) {
      return instance
    }
    this.forms = []
    this.options = Object.assign({}, optionsDefault, options)

    try {
      utmObserver(this.options.utm || optionsDefault.utm)
    } catch (err) {
      console.warn('UTM Observer Error', err)
    }

    if (document && document instanceof HTMLDocument) {
      document.querySelectorAll('[data-comrade-form]').forEach((form) => {
        this.forms.push(new ComradeForm(form, this))
      })
    }

    console.log(`Comrade Forms ${APP_VERSION}`)
  }
  addValidator(element, handler) {
    hyperform.addValidator(element, handler)
  }
}
