export function formRender(form, name, content) {
  const element = form.querySelector(`[data-cf="${name}"]`)
  if (element) {
    element.innerHTML = content
  }
}
