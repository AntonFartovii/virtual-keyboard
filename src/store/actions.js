import {LANG_CHANGE} from './types.js';
import {INPUT_TEXT} from './types.js';
import {SWITCH_CAPSLOCK} from './types.js';

export function langChange(value) {
  return {
    type: LANG_CHANGE,
    value,
  };
}

export function inputText(value) {
  return {
    type: INPUT_TEXT,
    value,
  };
}

export function switchCapslock() {
  return {
    type: SWITCH_CAPSLOCK,
  };
}
