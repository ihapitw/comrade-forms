import hyperform from 'hyperform'
const optionsHyperDefault = { revalidate: 'oninput' }
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
    this.loader = this.element.querySelector('[data-comrade-form-loader]')
    this.success = this.element.querySelector('[data-comrade-form-success]')
    if (!this.loader) {
      throw new Error(`[data-comrade-form-loader] element not found in <form>`)
    }
    if (!this.success) {
      throw new Error(`[data-comrade-form-success] element not found in <form>`)
    }

    this.element.dataset.comradeForm = 'INITED'
    this.element.addEventListener('submit', this.onSubmit.bind(this))
    const hyperOptions = Object.assign(
      {},
      optionsHyperDefault,
      this.base.options.hyperform || {}
    )
    hyperform(this.element, hyperOptions)
  }

  onSubmit(event) {
    event.preventDefault()
    this.loader.classList.add('active')
    const formData = new FormData(this.element)
    let request = new XMLHttpRequest()
    request.open(this.element.method || 'POST', this.element.action || '/')
    request.send(formData)
    request.onreadystatechange = () => {
      if (
        (request.readyState === XMLHttpRequest.DONE, request.status === 200)
      ) {
        this.success.classList.add('active')
        if (typeof this.base.options.onSuccess === 'function') {
          this.base.options.onSuccess(request.response, this.element)
        }
      } else if (request.readyState === XMLHttpRequest.DONE) {
        if (typeof this.base.options.onError === 'function') {
          this.base.options.onError(request.response, this.element)
        }
      }
      if (request.readyState === XMLHttpRequest.DONE) {
        this.loader.classList.remove('active')
      }
    }
  }
}
