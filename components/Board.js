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

    toHTML() {
        return createBoard()
    }

    onClick( event ) {
        const clickedItem = getClickedItem( event.target )

        clickedItem &&
        this.emitter.emit('key:click', clickedItem )
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
