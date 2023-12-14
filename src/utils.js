/**
 * Модуль вспомогательных утилит.
 * @module utils
 */
import fs from 'node:fs';
import path from 'node:path';
import { ENCODING, COMPLEX_VALUE_NAME, formatToExt } from './constants.js';

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
 * @returns {(COMPLEX_VALUE_NAME|string|*)}
 */
const formatValue = (value) => {
  switch (true) {
    case isObject(value) || Array.isArray(value):
      return COMPLEX_VALUE_NAME;
    case typeof value === 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

/**
 * Функция создания пути в рамках рекурсии.
 * @param {Array<string>} accPath Накопленный путь.
 * @param {string} value Значение.
 * @returns {string}
 */
const makePath = (accPath, value) => [...accPath, value].join('.');

/**
 * Функция формирования корректных путей до файлов.
 * @param  {...string} filepaths Пути до файлов.
 * @param {Array<string>} prefix Массив "префиксных" путей.
 * @returns {(Array<string>|string)}
 */
const makeCorrectPath = (prefix, ...filepaths) => {
  const paths = filepaths.map((filepath) => path.resolve(...prefix, filepath));

  return paths.length > 1 ? paths : paths.at();
};

/**
 * Функция синхронного чтения файлов на основе метода readFileSync модуля fs.
 * @param {...string} filepath Корректные пути до файлов.
 * @returns {(Array<string>|string)}
 */
const readFilesSync = (...filepaths) => {
  const data = filepaths.map((filepath) => {
    console.log(filepath);
    return fs.readFileSync(filepath, { encoding: ENCODING });
  });

  return data.length > 1 ? data : data.at();
};

/**
 * Функция возвращения формата на основе расширения файла.
 * @param {string} extname Расширение файла.
 * @returns {string}
 */
const getFormat = (extName) =>
  Object.keys(formatToExt).find((prop) =>
    new Set(formatToExt[prop]).has(extName)
  );

/**
 * Функция возврата отступа.
 * @param {boolean} hasClosure Находится ли в закрывающей скобке.
 * @param {string} sign Знак.
 * @param {string} replacer Реплейсер.
 * @param {number} spacesCount Количество отступов.
 * @param {number} depth Глубина
 * @returns {string}
 */
const getBreak = ({
  hasClosure = true,
  sign = '',
  replacer = ' ',
  spacesCount = 4,
  depth = 0,
}) =>
  hasClosure
    ? `\n${replacer.repeat(spacesCount * depth)}`
    : `\n${replacer.repeat(spacesCount * (depth + 1) - sign.length - 1)}`;

export {
  sortPairs,
  isObject,
  isEmptyObject,
  isAllObjects,
  formatValue,
  makePath,
  readFilesSync,
  makeCorrectPath,
  getFormat,
  getBreak,
};
