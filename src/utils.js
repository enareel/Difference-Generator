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
 * Проверка на соответствие типу Object.
 * @param {*} value Значение.
 * @returns {boolean}
 */
const isObject = (value) =>
  typeof value === 'object' && value instanceof Object && !Array.isArray(value);

/**
 * Проверка объекта на пустоту.
 * @param {Object} obj Объект.
 * @returns {boolean}
 */
const isEmptyObject = (obj) => isObject(obj) && !Object.keys(obj).length;

/**
 * Проверка того, являются ли все значения объектом.
 * @param {...Object} objs Значения.
 * @returns {boolean}
 */
const isAllObjects = (...objs) => objs.every((obj) => isObject(obj));

export { sortPairs, isObject, isEmptyObject, isAllObjects };
