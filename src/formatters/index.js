/**
 * Модуль функции, возвращающей необходимый форматер.
 * @module index
 */

import plain from './plain.js';
import stylish from './stylish.js';

/**
 * Функция, возвращающая форматер.
 * @param {string} [name=stylish] Название форматера.
 * @returns {function(): string}
 */
const getFormatter = (name) => {
  switch (name) {
    case 'plain':
      return plain;
    case 'stylish':
      return stylish;
    default:
      throw new Error('Данный форматер не поддерживается.');
  }
};

export default getFormatter;