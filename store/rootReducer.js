export function rootReducer(state, action) {
  let prevState
  switch (action.type) {
    case 'LANG_CHANGE':
      return {...state, lang: action.value};
    case 'INPUT_TEXT':
      return {...state, currentText: action.value};
    case 'SWITCH_CAPSLOCK':
      prevState = state.capslock
      return {...state, capslock: !prevState};
    default: return state
  }
}
