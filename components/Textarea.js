import {AppComponent} from "../core/AppComponent.js";


export class Textarea extends AppComponent {
    static className = 'output-area'

    constructor($root, options) {
        super($root, {
            listeners: ['keydown', 'keyup'],
            ...options
        })
        this.keys = ['backspace', 'tab', 'capslock', 'shift',
            'control', 'alt', 'delete', 'enter', 'windows',
            '←', '→', '↑', '↓']
    }

    toHTML() {
        return `<textarea class="output" 
                          placeholder="Here may to be your text..."></textarea>`
    }

    onKeydown( event ) {
        this.$emit('Textarea:keydown', event )
        this.textarea.focus()
    }

    onKeyup( event ) {
        this.$emit('Textarea:keyup', event )
        this.textarea.focus()
    }

    async init() {
        super.init();
        this.textarea = this.$root.$el.querySelector('.output')
        this.initHandlers()
        this.$on('board:click', this.handler.bind(this))
    }

    handler( clickedKey ) {
        const value = clickedKey.getAttribute('data-value').toLowerCase()
        this.handlers[value] ? this.handlers[value]() : this.handlers["default"](value)
        this.textarea.focus()
    }

    initHandlers() {
        this.handlers = {
            default: ( value ) => {
                this.textarea.value = this.textarea.value + value
            },
            backspace: () => {
                if (this.textarea.value.length > 0) {
                    this.textarea.value = this.textarea.value.slice(0,-1)
                    console.log(this.textarea.value)
                }
            },
            tab: () => {

            },
            capslock: () => {

            },
            shift: () => {

            },
            control: () => {

            },
            alt: () => {

            },
            delete: () => {

            },
            enter: () => {

            },
            windows: () => {

            },
            '←': () => {
                const cursorPosition = this.textarea.selectionStart;
                if (cursorPosition > 0) {
                    this.textarea.selectionStart = cursorPosition - 1;
                    this.textarea.selectionEnd = cursorPosition - 1;
                }
            },
            '→': () => {
                const cursorPosition = this.textarea.selectionStart;
                if (cursorPosition < this.textarea.length) {
                    this.textarea.selectionStart = cursorPosition + 1;
                    this.textarea.selectionEnd = cursorPosition + 1;
                }
            },
            '↑': () => {

            }
        }
    }
}


