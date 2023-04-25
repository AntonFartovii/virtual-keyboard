import {$} from "./dom.js";


export class App {
    constructor(selector, options) {
      this.$appContainer = $(selector)
      this.components = options.components || []
    }

    getRoot() {
      const $root = $.create('div', 'virtual-board')

      this.components = this.components.map(Component => {
        const $el = $.create('div', Component.className)
        const component = new Component($el)
        const componentHtml = component.toHTML()
        $root.append( componentHtml )
        return component
      })

      return $root
    }

    render() {
        const appHtml = this.getRoot()
        this.$appContainer.append( appHtml )
        this.components.forEach(component => component.init())
    }

}


