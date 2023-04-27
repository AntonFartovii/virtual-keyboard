import {AppComponent} from "../core/AppComponent.js";
import {createBoard} from "./BoardBuilder.js";


export class Board extends AppComponent {
    static className = 'input-area'

    constructor($root, options) {
        super($root, {
            listeners: ['click'],
            ...options
        })
    }

    init() {
        super.init();
        this.$on('Textarea:keydown', this.keyHandle.bind(this))
        this.$on('Textarea:keyup', this.keyHandle.bind(this))
    }

    keyHandle( event ) {

        const $key = this.$root.find(`[data-keycode='${event.keyCode}']`)

        console.log( event )
        if ( event.keyCode == '20') {
            if (event.type === 'keyup') {
                $key.toggleClass('active')
            }
            return
        }

        event.type === 'keydown'
            ? $key.addClass('active')
            : $key.removeClass('active')
    }

    toHTML() {
        return createBoard()
    }

    onClick( event ) {
        const clickedItem = getClickedItem( event.target )
        clickedItem && this.$emit('board:click', clickedItem )
    }

}

function getClickedItem( targetElement ) {

    if ( targetElement.classList.contains('key') ) {
        return targetElement
    }

    const parentElement = targetElement.parentElement
    if ( parentElement.classList.contains('key') )  {
        return parentElement
    }

    return null
}

