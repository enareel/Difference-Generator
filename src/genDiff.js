/**
 * Модуль функции, демонстрирующей различия между двумя объектами.
 * @module genDiff
 */

import getFormatter from './formatters/index.js';
import makeAST from './makeAST.js';

/**
 * Функция демонстрации различий между двумя объектами.
 * @param {Object} firstObj Первый объект.
 * @param {Object} secondObj Второй объект.
 * @param {string} [formatter=stylish] Форматер.
 * @returns {import('./makeAST.js').AST}
 */
const genDiff = (firstObj, secondObj, formatter = 'stylish') => {
  // Формируем AST.
  const AST = makeAST(firstObj, secondObj);

  console.log(AST);

  return getFormatter(formatter)(AST);
};

export default genDiff;
