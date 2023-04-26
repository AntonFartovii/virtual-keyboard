# RSS-Virtual-Keyboard

Компоненты:  
- toolbar, отображение настроек
- textarea, отображение вводимого текста
- клавиатура

В компонентах слушатели

$root - отвечает за корневой элемент компонента.
На $root вешаются слушатели

$root -> addEventListeners -> input -> onInput
