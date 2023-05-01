// Pure functions
import {$} from './dom.js';

export function capitalize(string) {
  if (typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function storage(key, data= null) {
  if (!data) return JSON.parse(localStorage.getItem(key));
  localStorage.setItem(key, JSON.stringify(data));
}
export function getClickedItem(targetElement) {
  if (targetElement.classList.contains('key')) {
    return $(targetElement);
  }
  const parentElement = targetElement.parentElement;
  if (parentElement.classList.contains('key')) {
    return $(parentElement);
  }
  return null;
}
export function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
