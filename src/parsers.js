/**
 * Модуль функции, отвечающей за парсинг данных.
 * @module parsers
 */

import jsYaml from 'js-yaml';
import { FORMAT_ERROR } from './constants.js';

/**
 * Функция, отвечающая за парсинг данных. Синхронно.
 * @param {string} format Формат данных.
 * @param {string} data Данные.
 * @returns {(*|*[])}
 */
const getData = (format, data) => {
  switch (format) {
    case 'YAML':
      return jsYaml.load(data);
    case 'JSON':
      return JSON.parse(data);
    case 'TXT':
      return data;
    default:
      throw new Error(FORMAT_ERROR);
  }
};

export default getData;
