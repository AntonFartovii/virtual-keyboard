import {AppComponent} from "../core/AppComponent.js";


export class Textarea extends AppComponent {
    static className = 'output-area'

    constructor($root, options) {
        super($root, {
            listeners: ['click', 'keydown'],
            ...options
        })
    }

    toHTML() {
        return `<textarea class="output" 
                          placeholder="Here may to be your text..."></textarea>`
    }

    onClick( event ) {
        console.log( event.target )
    }

    onKeydown( event ) {
        const {key} = event
        console.log( key )
    }

    init() {
        super.init();
        this.emitter.subscribe('key:click', elem => {
            const value = elem.getAttribute('data-value')
            this.printText( value )
        })
    }

    printText( value ) {
        const output = this.$root.$el.querySelector('.output')
        output.value = output.value + value
    }
}
