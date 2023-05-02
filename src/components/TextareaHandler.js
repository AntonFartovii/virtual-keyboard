export function textareaHandler(value, textarea) {
  function setValue(cb, direction) {
    const cursorPosition = textarea.selectionStart;
    textarea.value = cb(cursorPosition);
    textarea.selectionStart = cursorPosition + direction;
    textarea.selectionEnd = cursorPosition + direction;
  }

  const handlers = {
    default: (value) => {
      const cb = (cursorPosition) =>
        textarea.value.slice(0, cursorPosition) + value +
        textarea.value.slice(cursorPosition);
      setValue(cb, 1);
    },
    Space: () => {
      const cb = (cursorPosition) =>
        textarea.value.slice(0, cursorPosition) + ' ' +
        textarea.value.slice(cursorPosition);
      setValue(cb, 1);
    },
    Backspace: () => {
      const cursorPosition = textarea.selectionStart;
      if (textarea.value.length > 0 && cursorPosition > 0) {
        const cb = (cursorPosition) =>
          textarea.value.slice(0, cursorPosition - 1) +
          textarea.value.slice(cursorPosition);
        setValue(cb, -1);
      }
    },
    Tab: () => {
      const cb = (cursorPosition) =>
        textarea.value.slice(0, cursorPosition) + '    ' +
        textarea.value.slice(cursorPosition);
      setValue(cb, 4);
    },
    CapsLock: () => {
    },
    Delete: () => {
      const cursorPosition = textarea.selectionStart;
      if (textarea.value.length > 0 && cursorPosition < textarea.value.length) {
        const cb = (cursorPosition) =>
          textarea.value.slice(0, cursorPosition) +
          textarea.value.slice(cursorPosition + 1);
        setValue(cb, 0);
      }
    },
    Enter: () => {
      const cb = (cursorPosition) =>
        textarea.value.slice(0, cursorPosition) + '\n' +
        textarea.value.slice(cursorPosition);
      setValue(cb, 1);
    },
    MetaLeft: () => {
    },
    ArrowLeft: () => {
      const cursorPosition = textarea.selectionStart;
      if (cursorPosition > 0) {
        textarea.selectionStart = cursorPosition - 1;
        textarea.selectionEnd = cursorPosition - 1;
      }
    },
    ArrowRight: () => {
      const cursorPosition = textarea.selectionStart;
      if (cursorPosition < textarea.value.length) {
        textarea.selectionStart = cursorPosition + 1;
        textarea.selectionEnd = cursorPosition + 1;
      }
    },
    ArrowUp: () => {
      const cursorPosition = textarea.selectionStart;
      const text = textarea.value.slice(0, cursorPosition);
      const lastLineLength = text.lastIndexOf('\n');
      const paddingLeft = cursorPosition - lastLineLength;
      const newLastLineLength = text.slice(0, lastLineLength).lastIndexOf('\n');
      let newCursorPosition = newLastLineLength + paddingLeft;
      if (lastLineLength < newCursorPosition) {
        newCursorPosition = lastLineLength;
      }
      textarea.selectionStart = newCursorPosition;
      textarea.selectionEnd = newCursorPosition;
    },
    ArrowDown: () => {
      const cursorPosition = textarea.selectionStart;
      const textLeft = textarea.value.slice(0, cursorPosition);
      const textRight = textarea.value.slice(cursorPosition);
      const lastLineLength = textLeft.lastIndexOf('\n');
      const paddingLeft = cursorPosition - lastLineLength;
      const nextLineLength = textRight.indexOf('\n');
      const nextRow = textRight.split('\n')[1];
      if (nextRow) {
        let newCursorPosition = cursorPosition + nextLineLength + paddingLeft;
        if (nextRow.length < paddingLeft) {
          newCursorPosition =
              cursorPosition + nextLineLength + nextRow.length + 1;
        }
        textarea.selectionStart = newCursorPosition;
        textarea.selectionEnd = newCursorPosition;
      } else {
        const newCursorPosition =
            cursorPosition + nextLineLength + 1;
        textarea.selectionStart = newCursorPosition;
        textarea.selectionEnd = newCursorPosition;
      }
    },
    ShiftLeft: () => {
    },
    ShiftRight: () => {
    },
    ControlLeft: () => {
    },
    ControlRight: () => {
    },
    AltLeft: () => {
    },
    AltRight: () => {
    },
  };
  handlers[value] ? handlers[value]() : handlers['default'](value);
}
