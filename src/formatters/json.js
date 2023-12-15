/**
 * Модуль форматера json.
 * @module json
 */

import { QuotationMark } from '../constants.js';
import { isObject, formatValue, getBreak } from '../utils.js';

/**
 * Функция-форматер, приводящая AST к стилю json.
 * @param {AST} tree AST.
 * @param {string} replacer Реплейсер.
 * @param {number} spacesCount Количество отступов.
 * @returns {string}
 */
const json = (tree, replacer = ' ', spacesCount = 4) => {
  /**
   * Вспомогательная рекурсивная функция.
   * @param {(AST|Array<Array>)} data AST.
   * @param {number} [depth=0] Глубина.
   * @returns {string}
   */
  const iter = (data, depth = 2) => {
    const result = data.reduce(
      /**
       *
       * @param {string} acc Аккумулятор.
       * @param {ASTNode} node Узел AST.
       * @returns {string}
       */
      (acc, node) => {
        // Если встречается свойство 'key'.
        if (node[0] === 'key') {
          return [...acc];
        }

        // Если перед нами - объект-дескриптор.
        if (isObject(node) && 'key' in node) {
          return [
            ...acc,
            `${getBreak({ replacer, spacesCount, depth })}${formatValue(
              node.key,
              QuotationMark.DOUBLE
            )}: ${iter(Object.entries(node), depth + 1)}`,
          ];
        }

        // Если значение является объектом или массивом.
        if (isObject(node[1]) || Array.isArray(node[1])) {
          return [
            ...acc,
            `${getBreak({ replacer, spacesCount, depth })}${formatValue(
              node[0],
              QuotationMark.DOUBLE
            )}: ${iter(
              Array.isArray(node[1]) ? node[1] : Object.entries(node[1]),
              depth + 1
            )}`,
          ];
        }

        return [
          ...acc,
          `${getBreak({ replacer, spacesCount, depth })}${formatValue(
            node[0],
            QuotationMark.DOUBLE
          )}: ${formatValue(node[1], QuotationMark.DOUBLE)}`,
        ];
      },
      []
    );

    return `{${result.join(',')}${getBreak({ hasClosure: true, depth })}}`;
  };
  return iter(tree, 0);
};

export default json;
