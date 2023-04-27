import {DomListener} from "./DomListener.js";

export class AppComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.store = options.store
        this.unsubscribers = []
        this.prepare()
    }

    prepare() {

    }

    $on(event, fn) {
      const unsub = this.emitter.subscribe(event, fn)
      this.unsubscribers.push(unsub)
    }

    $emit(event, ...args) {
      this.emitter.emit(event, ...args)
    }

    toHTML() {
      return ''
    }

    init() {
      this.initDOMListeners()
    }

destroy() {
      this.removeDOMListeners()
      this.unsubscribers.forEach( unsub => unsub())
    }
}
