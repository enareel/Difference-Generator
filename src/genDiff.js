/**
 * Модуль функции, демонстрирующей различия между двумя объектами.
 * @module genDiff
 */

import makeAST from './makeAST.js';
import getFormatter from './formatters/index.js';

/**
 * Функция демонстрации различий между двумя объектами.
 * @param {string} [formatter=stylish] Форматер.
 * @param {Object} [firstObj={}] Первый объект.
 * @param {Object} [secondObj={}] Второй объект.
 * @returns {import('./makeAST.js').AST}
 */
const genDiff = (formatter = 'stylish', firstObj = {}, secondObj = {}) => {
  // Формируем AST.
  const AST = makeAST(firstObj, secondObj);

  return getFormatter(formatter)(AST);
};

export default genDiff;
