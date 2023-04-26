import {keyboard} from "../data/keyboard.js";

export function createBoard() {
    let html = []
    let rowHtml = []
    for ( let row in keyboard ) {
        const rowData = keyboard[row]
        rowHtml = toRowHTML( rowData )
        html.push( `<div class="row">${rowHtml.join('')}</div>` )
    }
    return html.join('')
}

function toRowHTML( rowData ) {
    return rowData.map( toKeyHTML )
}

function toKeyHTML( {en} ) {
    const keyData = en
    return `
        <div class="key" data-value="${keyData.value}" data-shift-value="${keyData.shiftValue}">
          <div class="value">${keyData.value}</div>
          <div class="shift-value">${keyData.shiftValue}</div>
        </div>`
}
