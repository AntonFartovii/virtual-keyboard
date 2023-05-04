# RSS-Virtual-Keyboard

Компоненты:  
- toolbar, отображение настроек
- textarea, отображение вводимого текста
- клавиатура, ввод текста управлением мышью

В компонентах слушатели

$root - отвечает за корневой элемент компонента.
На $root вешаются слушатели

$root -> addEventListeners -> input -> onInput


Emitter
  ```
    // Уведомляем слушателей если они есть
    // table.emit('key:select', {})
    emit(event, ...args) {
   ...
    }
    // Подписываемся на уведомления
    // Добавляем нового слушателя
    // formula.subscribe('key:select', () => {})
    subscribe(event, fn) {
       ...
    }
}
```

Store
Я выбрал концепцию Redux. Тот же эмиттер на паттерне Observer.
Подписываемся на определённый тип событий.
state в function createStore будут приватными, а функции публичными
rootReducer всегда возвращает state
