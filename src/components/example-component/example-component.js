import { Element }  from '@polymer/polymer/polymer-element'

class ExampleComponent extends Element {
  static get is () {
    return 'example-component'
  }
  
  static get template () {
    return `<h1>Hello World</h1>`
  }
}

customElements.define(ExampleComponent.is, ExampleComponent)

export default Element

