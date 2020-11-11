import hyperform from 'hyperform'

export class ComradeForm {
  constructor(element) {
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
    this.element.dataset.comradeForm = 'INITED'
    hyperform(this.element)
  }
}
