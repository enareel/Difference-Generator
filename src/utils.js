/**
 * Модуль вспомогательных функций.
 * @module utils
 */

/**
 * Функция сортировки пар массива.
 * @param {Array} a Пара (массив из двух элементов).
 * @param {Array} b Пара (массив из двух элементов).
 * @returns {number}
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
  typeof value === 'object' && value instanceof Object;

/**
 * Проверка того, являются ли все значения объектом.
 * @param {...Object} objs Значения.
 * @returns {boolean}
 */
const isAllObjects = (...objs) => objs.every((obj) => isObject(obj));

/**
 * Проверка объекта на пустоту.
 * @param {Object} obj Объект.
 * @returns
 */
const isEmptyObject = (obj) => !Object.keys(obj).length;

export { isEmptyObject, isObject, isAllObjects, sortPairs };
