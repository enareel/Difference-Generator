/**
 * Модуль функции, возвращающей необходимый форматер.
 * @module index
 */

import { FORMATTER_ERROR } from '../constants.js';
import plain from './plain.js';
import stylish from './stylish.js';

/**
 * Функция, возвращающая форматер.
 * @param {string} [name=stylish] Название форматера.
 * @returns {function(import('./makeAST.js').AST): string}
 */
const getFormatter = (name) => {
  switch (name) {
    case 'plain':
      return plain;
    case 'stylish':
      return stylish;
    default:
      throw new Error(FORMATTER_ERROR);
  }
};

export default getFormatter;
