import {keyboard} from '../data/keyboard.js';

export function createBoard(lang) {
  function toKeyHTML(data) {
    let {[lang]: keyData, className, keyCode, code, type, location} = data;
    className = className ? ('key ' + className) : 'key';
    return `
        <div class="${className.toLowerCase()}" 
            data-keycode="${keyCode}"
            data-code="${code}"
            data-type="${type}"
            data-key="${code}" 
            data-location="${location}"
            data-value="${keyData.value.toLowerCase()}" 
            data-shift-value='` + keyData.shiftValue.toLowerCase() + `'>
            <div class="default active">${keyData.value}</div>
            <div class="caps-mode">${keyData.value.toUpperCase()}</div>
            <div class="shift-mode">
              ${keyData.shiftValue || keyData.value.toUpperCase()}
            </div>
            <div class="shift-value">${keyData.shiftValue}</div>
            <div class="caps-shift-mode">
              ${keyData.shiftValue || keyData.value.toLowerCase()}
            </div>
        </div>`;
  }

  function toRowHTML([row, keys]) {
    const html = keys.map(toKeyHTML);
    return `<div class="row" data-row="${row}">${html.join('')}</div>`;
  }

  const html = Object.entries(keyboard).map(toRowHTML);
  return `<div class="section-wrapper">${html.join('')}</div>`;
}
