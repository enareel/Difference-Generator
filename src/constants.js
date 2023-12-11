/**
 * Модуль констант.
 * @module constants
 */

/**
 * Определение типа FormatExtMap.
 * @typedef {Object} FormatExtMap
 * @prop {string} YAML Расширения YAML.
 * @prop {string} JSON Расширение JSON.
 */

/**
 * Словарь форматов и расширений.
 * @type {FormatExtMap}
 */
const formatToExt = {
  YAML: ['.yaml', '.yml'],
  JSON: '.json',
};

/**
 * Название базовой кодировки.
 * @constant
 */
const ENCODING = 'utf-8';

/**
 * Название сложного значения (в т.ч. ссылочного типа данных), используемое в форматере stylish.
 * @constant
 */
const COMPLEX_VALUE_NAME = '[complex value]';

export { formatToExt, ENCODING, COMPLEX_VALUE_NAME };
