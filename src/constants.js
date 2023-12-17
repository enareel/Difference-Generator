/**
 * Модуль констант.
 * @module constants
 */

/**
 * Определение типа Options.
 * @typedef {Object} Options
 * @prop {string} name Название программы.
 * @prop {string} version Версия программы.
 * @prop {string} description Описание программы.
 * @prop {string} fixturesDir Название папки с fixtures.
 */

/**
 * Определение типа FormatExtMap.
 * @typedef {Object} FormatExtMap
 * @prop {Array<string>} YAML Расширения YAML.
 * @prop {Array<string>} JSON Расширения JSON.
 * @prop {Array<string>} TXT Расширения TXT.
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
 * Перечисление типов кавычек.
 * @enum {Array<string>}
 */
const QuotationMark = {
  SINGLE: ["'", "'"],
  DOUBLE: ['"', '"'],
};

/**
 * Перечисление типов ASTNode.
 * @enum {string}
 */
const ASTNodeType = {
  LEAF: 'leaf',
  INTERNAL: 'internal',
};

/**
 * Перечисление состояний ASTNode.
 * @enum {string}
 */
const ASTNodeState = {
  UNCHANGED: 'unchanged',
  CHANGED: 'changed',
  ADDED: 'added',
  REMOVED: 'deleted',
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
const FORMAT_ERROR = 'Данный формат не поддерживается.';

/**
 * Сообщение об ошибке выбора форматера.
 * @constant
 */
const FORMATTER_ERROR = 'Данный форматер не поддерживается.';

/**
 * Название сложного значения (в т.ч. ссылочного типа данных), используемое в форматере stylish.
 * @constant
 */
const COMPLEX_VALUE_NAME = '[complex value]';

/**
 * Опции программы.
 * @type {Options}
 */
const Options = {
  name: 'gendiff',
  version: '0.9.4',
  description: 'Compares two configuration files and shows a difference.',
  fixturesDir: '__fixtures__',
};

export {
  formatToExt,
  QuotationMark,
  ASTNodeType,
  ASTNodeState,
  ENCODING,
  FORMAT_ERROR,
  FORMATTER_ERROR,
  COMPLEX_VALUE_NAME,
  Options,
};
