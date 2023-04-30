import {$} from "../core/dom.js";
import {Emitter} from "../core/Emitter.js";
import {keyboard} from "../data/keyboard.js";


export class App {
    constructor(selector, options) {
      this.$appContainer = $(selector)
      this.components = options.components || []
      this.store = options.store
      this.emitter = new Emitter()
      this.data = keyboard
    }

    getRoot() {
      const componentOptions = {
        emitter: this.emitter,
        store: this.store,
        data: this.data
      }
      const $root = $.create('main', 'board-container')
      this.components = this.components.map(Component => {
        const $el = $.create('section', Component.className)
        const component = new Component($el, componentOptions)
        const componentHtml = component.toHTML()
        $el.html( componentHtml )
        $root.append( $el )
        return component
      })
      return $root
    }

    render() {
      const appHtml = this.$root = this.getRoot()
      this.$appContainer.append( appHtml )
      this.components.forEach( component => component.init() )
    }

    destroy() {
      this.components.forEach( component => component.destroy())
    }
}

