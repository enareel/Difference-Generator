/**
 * Модуль вспомогательных утилит.
 * @module utils
 */

/**
 * Функция сортировки пар массива.
 * @param {Array} a Пара (массив из двух элементов).
 * @param {Array} b Пара (массив из двух элементов).
 * @returns {(-1|0|1)}
 */
const sortPairs = (a, b) => {
  if (a[0] === b[0]) {
    return 0;
  }
  return a[0] > b[0] ? 1 : -1;
};

/**
 * Функция проверки на соответствие типу Object.
 * @param {*} value Значение.
 * @returns {boolean}
 */
const isObject = (value) =>
  typeof value === 'object' && value instanceof Object && !Array.isArray(value);

/**
 * Функция проверки объекта на пустоту.
 * @param {Object} obj Объект.
 * @returns {boolean}
 */
const isEmptyObject = (obj) => isObject(obj) && !Object.keys(obj).length;

/**
 * Функция проверки того, являются ли все значения объектом.
 * @param {...*} objs Значения.
 * @returns {boolean}
 */
const isAllObjects = (...objs) => objs.every((obj) => isObject(obj));

/**
 * Функция форматирования значения.
 * @param {*} value Значение.
 * @returns {('[complex value]'|string|*)}
 */
const formatValue = (value) => {
  switch (true) {
    case isObject(value) || Array.isArray(value):
      return '[complex value]';
    case typeof value === 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

/**
 * Функция создания пути.
 * @param {Array<string>} path Накопленный путь.
 * @param {string} value Значение.
 * @returns {string}
 */
const makePath = (path, value) => [...path, value].join('.');

export {
  sortPairs,
  isObject,
  isEmptyObject,
  isAllObjects,
  formatValue,
  makePath,
};
