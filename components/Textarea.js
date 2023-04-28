import {AppComponent} from "../core/AppComponent.js";
import * as actions from '../store/actions.js'
import {storage} from "../core/utils.js";

export class Textarea extends AppComponent {
    static className = 'output-area'

    constructor($root, options) {
        super($root, {
            listeners: ['keydown', 'keyup', 'input'],
            ...options
        })
    }

    toHTML() {
        return `<textarea class="output" 
                          placeholder="Here may to be your text..."></textarea>`
    }

    onInput() {
        const currentText = this.textarea.value
        this.$dispatch(actions.inputText(currentText))
    }

    onKeydown( event ) {
        this.$emit('Textarea:keydown', event )
        this.textarea.focus()
    }

    onKeyup( event ) {
        this.$emit('Textarea:keyup', event )
        this.textarea.focus()
    }

    init() {
        super.init();
        this.textarea = this.$root.$el.querySelector('.output')
        this.textarea.value = storage('keyboard-state').currentText
        this.initHandlers()
        this.$on('board:click', this.handler.bind(this))
    }

    handler( clickedKey ) {
        const value = clickedKey.getAttribute('data-code').toLowerCase()
        this.handlers[value] ? this.handlers[value]() : this.handlers["default"](value)
        const currentText = this.textarea.value
        this.$dispatch(actions.inputText(currentText))
        this.textarea.focus()
    }

    getPosition() {
        return this.textarea.selectionStart;
    }

    setValue( cb, direction) {
        const cursorPosition = this.getPosition()
        this.textarea.value = cb(cursorPosition)
        this.textarea.selectionStart = cursorPosition + direction;
        this.textarea.selectionEnd = cursorPosition + direction;
    }

    initHandlers() {
        this.handlers = {
            default: ( value ) => {
                const cb = (cursorPosition) =>
                    this.textarea.value.slice(0, cursorPosition) + value
                    + this.textarea.value.slice(cursorPosition);
                this.setValue( cb, 1)
            },
            space: () => {
                const cb = (cursorPosition) =>
                    this.textarea.value.slice(0, cursorPosition) + ' '
                    + this.textarea.value.slice(cursorPosition);
                this.setValue( cb, 1)
            },
            backspace: () => {
                const cursorPosition = this.getPosition()
                if (this.textarea.value.length > 0 && cursorPosition > 0) {
                    const cb = (cursorPosition) =>
                        this.textarea.value.slice(0, cursorPosition - 1)
                        + this.textarea.value.slice(cursorPosition);
                    this.setValue( cb, -1)
                }
            },
            controlleft: () => {

            },
            controlright: () => {

            },
            altleft: () => {

            },
            altright: () => {

            },
            tab: () => {
                const cb = (cursorPosition) =>
                    this.textarea.value.slice(0, cursorPosition) + '    '
                    + this.textarea.value.slice(cursorPosition);
                this.setValue( cb, 4)
            },
            capslock: () => {

            },
            shiftleft: () => {

            },
            shiftright: () => {

            },
            control: () => {

            },
            alt: () => {

            },
            delete: () => {
                const cursorPosition = this.textarea.selectionStart;
                if (this.textarea.value.length > 0 && cursorPosition < this.textarea.value.length) {
                    console.log('del')
                    // const newValue =
                    //     this.textarea.value.slice(0, cursorPosition - 1)
                    //     + this.textarea.value.slice(cursorPosition);
                    // this.textarea.value = newValue;
                    // this.textarea.selectionStart = cursorPosition - 1;
                    // this.textarea.selectionEnd = cursorPosition - 1;
                }
            },
            enter: () => {

            },
            windows: () => {

            },
            arrowleft: () => {
                const cursorPosition = this.textarea.selectionStart;
                if (cursorPosition > 0) {
                    this.textarea.selectionStart = cursorPosition - 1;
                    this.textarea.selectionEnd = cursorPosition - 1;
                }
            },
            'arrowright': () => {
                const cursorPosition = this.textarea.selectionStart;
                if (cursorPosition < this.textarea.value.length) {
                    this.textarea.selectionStart = cursorPosition + 1;
                    this.textarea.selectionEnd = cursorPosition + 1;
                }
            },
            'arrowup': () => {

            },
            'arrowdown': () => {

            }
        }
    }
}


