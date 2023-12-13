/**
 * Модуль констант.
 * @module constants
 */

/**
 * Определение типа FormatExtMap.
 * @typedef {Object} FormatExtMap
 * @prop {Array<string>} YAML Расширения YAML.
 * @prop {Array<string>} JSON Расширения JSON.
 */

/**
 * Словарь форматов и расширений.
 * @type {FormatExtMap}
 */
const formatToExt = {
  YAML: ['.yaml', '.yml'],
  JSON: ['.json'],
  TXT: ['.txt'],
};

/**
 * Название базовой кодировки.
 * @constant
 */
const ENCODING = 'utf-8';

/**
 * Сообщение об ошибке форматирования.
 * @constant
 */
const FORMAT_ERROR = 'Формат не поддерживается.';

/**
 * Название сложного значения (в т.ч. ссылочного типа данных), используемое в форматере stylish.
 * @constant
 */
const COMPLEX_VALUE_NAME = '[complex value]';

/**
 * Перечисление данных программы.
 * @enum {string}
 */
const data = {
  NAME: 'gendiff',
  VERSION: '0.9.1',
  DESCRIPTION: 'Compares two configuration files and shows a difference.',
  SRC_DIR: '__fixtures__',
};

export { formatToExt, ENCODING, FORMAT_ERROR, COMPLEX_VALUE_NAME, data };
