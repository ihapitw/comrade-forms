import hyperform from 'hyperform'
import { ComradeForm } from './modules/form'

const optionsDefault = {
  onSuccess(response) {
    console.log(`Form submit done, response: ${response}`)
  },
  onError(response) {
    console.error(`Form submit error, response: ${response}`)
  }
}

export class ComradeForms {
  constructor(options) {
    this.forms = []
    this.options = Object.assign({}, optionsDefault, options)
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
