import {keyboard} from "../data/keyboard.js";

export function createBoard() {
    let html = []
    let rowHtml = []
    for ( let row in keyboard ) {
        rowHtml = toRowHTML( keyboard[row] )
        html.push( `<div class="row" data-row="${row}">${rowHtml.join('')}</div>` )
    }
    return html.join('')
}

function toRowHTML( rowData ) {
    return rowData.map( toKeyHTML )
}

function toKeyHTML( data ) {
    let {en: keyData, className, keyCode} = data
    className = className ? ('key ' + className) : 'key'
    return `
        <div class="${className.toLowerCase()}" 
            data-keycode="${keyCode}"
            data-value="${keyData.value.toLowerCase()}" 
            data-shift-value="${keyData.shiftValue.toLowerCase()}">
          <div class="value">${keyData.value}</div>
          <div class="shift-value">${keyData.shiftValue}</div>
        </div>`
}
