
export class AppComponent {
    constructor($root, options = {}) {
        this.name = options.name || ''
    }

    toHTML() {
        return ''
    }
}
