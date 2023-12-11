/**
 * Модуль функции, отвечающей за парсинг данных.
 * @module parsers
 */
import jsYaml from 'js-yaml';


/**
 * Функция, отвечающая за парсинг данных. Синхронно.
 * @param {Array<string>} data Массив данных (могут быть пути).
 * @param {string} format Формат данных.
 * @returns {(*|*[])}
 */
const getData = (data, format) => {
  const result = data.map((value) => {
    switch (format) {
      case 'YAML':
        return jsYaml.load(value);
      case 'JSON':
        return JSON.parse(value);
      case 'TXT':
        return value;
      default:
        throw new Error('Формат не поддерживается.');
    }
  });

  return result.length > 1 ? result : result.at();
};

export default getData;
