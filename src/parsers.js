/**
 * Модуль функции, отвечающей за парсинг данных.
 * @module parsers
 */
import jsYaml from 'js-yaml';
import { FORMAT_ERROR } from './constants.js';

/**
 * Функция, отвечающая за парсинг данных. Синхронно.
 * @param {string} format Формат данных.
 * @param {...string} data Данные .
 * @returns {(*|*[])}
 */
const getData = (format, ...data) => {
  const result = data.map((value) => {
    switch (format) {
      case 'YAML':
        return jsYaml.load(value);
      case 'JSON':
        return JSON.parse(value);
      case 'TXT':
        return value;
      default:
        throw new Error(FORMAT_ERROR);
    }
  });

  return result.length > 1 ? result : result.at();
};

export default getData;
