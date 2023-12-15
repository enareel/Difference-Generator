/**
 * Модуль функции, возвращающей необходимый форматер.
 * @module index
 */

import { FORMATTER_ERROR } from '../constants.js';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

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
    case 'json':
      return json;
    default:
      throw new Error(FORMATTER_ERROR);
  }
};

export default getFormatter;
