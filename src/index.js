import { ComradeForm } from './modules/form'

const optionsDefault = {}

export class ComradeForms {
  constructor(options) {
    this.forms = []
    this.options = Object.assign({}, optionsDefault, options)
    if (document && document instanceof HTMLDocument) {
      document.querySelectorAll('[data-comrade-form]').forEach((form) => {
        this.forms.push(new ComradeForm(form))
      })
    }
  }
}
