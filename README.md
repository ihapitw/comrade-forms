# Comrade Forms

### Usage without package manager:

---

```HTML
<script src="https://unpkg.com/comrade-forms@latest/dist/comrade-forms.js"></script>
<script>
  new ComradeForms()
</script>
```

### Usage with npm or yarn

---

```CONSOLE
$ yarn add comrade-forms
```

```CONSOLE
$ npm i comrade-forms --save
```

```JS
import { ComradeForms } from 'comrade-forms'

new ComradeForms()
```

### Simple HTML:

```HTML
<form action="/api/path" method="POST" data-comrade-form>
  <div data-comrade-form-loader></div>
  <div data-comrade-form-success></div>
  <div>
    <label for="name">Name</label>
    <input type="text" name="name" id="name" data-akismet="name" required />
  </div>
  <div>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" data-akismet="email" required/>
  </div>
  <div>
    <label for="email-2">Other Email</label>
    <input type="email" name="other-email" id="email-2" data-akismet="email" required/>
  </div>
  <div>
    <button type="submit">Submit</button>
  </div>
</form>
```

### Some options:

```JS
new ComradeForms({
  /**
   * success callback
   * @param {string, object} response
   * @param {HTMLFormElement} form
   */
  onSuccess(response, form) {},

  /**
   * error callback
   * @param {string, object} error
   * @param {HTMLFormElement} form
   */
  onError(error, form) {}
})
```

### Default CSS classes

| CSS Class      | State                                          |
| -------------- | ---------------------------------------------- |
| `hf-invalid`   | field has invalid                              |
| `hf-valid`     | field has valid                                |
| `hf-validated` | means that the validation has worked for field |

> ### Validation based on [hyperform](https://hyperform.js.org/), please look [documentation](https://hyperform.js.org/docs/) for more info

### You can do this

```JS
new ComradeForms({
  hyperform: {
    // some configuration for hyperform

    // also:

    // classes: {
    //   valid: 'custom-valid-class',
    //   invalid: 'custom-invalid-class',
    //   validated: 'custom-validated-class',
    //   warning: 'custom-warning-class',
    // }
  }
})
```

### Add Custom Validator for field

#### for example phone field length validator

```JS
const comradeForms = new ComradeForms()
const phones = document.querySelectorAll('input[type="tel"]')
phones.forEach(field => {
  comradeForms.addValidator(field, function(element) {
    const valid = element.value.length === 11
    element.setCustomValidity(
      valid ?
      '' :
      'Please enter correct phone number'
    );
    return valid
  })
})
```
