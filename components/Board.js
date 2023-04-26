import {AppComponent} from "../core/AppComponent.js";
import {createBoard} from "./BoardBuilder.js";


export class Board extends AppComponent {
    static className = 'input-area'

    constructor($root) {
        super($root, {
            listeners: ['click', 'keydown']
        })
    }

    toHTML() {
        return createBoard()
    }

    onClick() {
      console.log('click')
    }

    onKeydown( event ) {
        const {key} = event
        console.log( key )
    }
}
