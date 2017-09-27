import { PropertyAccessors } from '@polymer/polymer/lib/mixins/property-accessors.js'
import { html, render } from 'lit-html'

const template = html`<h1>Hello World 2</h1>`

class ExampleComponent2 extends PropertyAccessors(HTMLElement) {
  static get is () { return 'example-component-2' }
  
  constructor () {
    super()
    this.attachShadow({mode: 'open'})
    render(template, this.shadowRoot)
  }
}

customElements.define(ExampleComponent2.is, ExampleComponent2)