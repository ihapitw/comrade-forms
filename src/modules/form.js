import hyperform from 'hyperform'
import Snackbar from 'node-snackbar'
import { optionsHyperDefault } from './const'
import { formRequest } from './request'

export class ComradeForm {
  constructor(element, base) {
    if (element && element instanceof HTMLFormElement) {
      if (element.dataset.comradeForm === 'INITED') {
        console.error(`${element} this form already inited`)
        return false
      }
    } else {
      console.error(
        `Input element error: form element must exist and looks like <form></form>`
      )
      return false
    }

    this.element = element
    this.base = base

    this.element.dataset.comradeForm = 'INITED'
    this.element.addEventListener('submit', this.onSubmit.bind(this))
    const hyperOptions = Object.assign(
      {},
      optionsHyperDefault,
      this.base.options.hyperform || {}
    )
    hyperform(this.element, hyperOptions)
  }

  get akismet() {
    const akismet = {}
    Array.from(this.element.elements).forEach((element) => {
      if (element.dataset.akismet && element.name) {
        const type = element.dataset.akismet
        if (!akismet[`akismet:${type}`]) {
          akismet[`akismet:${type}`] = []
        }
        akismet[`akismet:${type}`].push(element.name)
      }
    })
    return JSON.stringify(akismet)
  }

  onSubmit(event) {
    event.preventDefault()
    if (this.element.classList.contains('cf-loading')) {
      return false
    }
    const formData = new FormData(this.element)
    formData.append('akismet', this.akismet)

    this.element.classList.add('cf-loading')
    this.element.classList.remove('cf-error')

    formRequest({
      url: this.element.action,
      method: this.element.method,
      data: formData
    })
      .then((response) => {
        this.element.reset()
        this.element.classList.add('cf-success')
        if (typeof this.base.options.onSuccess === 'function') {
          this.base.options.onSuccess(response, this.element)
        }
      })
      .catch((err) => {
        this.element.classList.add('cf-error')
        if (typeof this.base.options.onError === 'function') {
          this.base.options.onError(err, this.element)
        }
        Snackbar.show({
          text:
            err.data.message ||
            `ERROR ${err.status}, Ooops... something wrong, please try again later.`,
          showAction: false,
          pos: 'bottom-center',
          textColor: '#ffffff',
          backgroundColor: '#EC3F51'
        })
      })
      .finally(() => {
        this.element.classList.remove('cf-loading')
      })
  }
}
