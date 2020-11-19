import hyperform from 'hyperform'
import utmObserver from './modules/utm-observer'

import { ComradeForm } from './modules/form'
import { optionsDefault } from './modules/const'

let instance = null

export class ComradeForms {
  constructor(options) {
    if (instance) {
      return instance
    }
    this.forms = []
    this.options = Object.assign({}, optionsDefault, options)

    utmObserver(options.utm)

    if (document && document instanceof HTMLDocument) {
      document.querySelectorAll('[data-comrade-form]').forEach((form) => {
        this.forms.push(new ComradeForm(form, this))
      })
    }
  }
  addValidator(element, handler) {
    hyperform.addValidator(element, handler)
  }
}
