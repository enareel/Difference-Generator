/**
 * Модуль форматера plain.
 * @module plain
 */

import { ASTNodeType, ASTNodeState } from '../constants.js';
import { formatValue, makePath } from '../utils.js';

/**
 * Определение типа StateDescMap.
 * @typedef {Object}
 * @prop {string} added Описание состояния "добавлено".
 * @prop {string} deleted Описание состояния "удалено".
 * @prop {string} changed Описание состояния "изменено".
 */

/**
 * Словарь состояний и описаний.
 * @type {StateDescMap}
 */
const stateToDesc = {
  added: 'added',
  deleted: 'removed',
  changed: 'updated',
};

/**
 * Функция-форматер, приводящая AST к стилю plain.
 * @param {AST} tree AST.
 * @returns {string}
 */
const plain = (tree) => {
  /**
   * Вспомогательная рекурсивная функция.
   * @param {AST} data AST.
   * @param {Array} path Путь.
   * @returns {string}
   */
  const iter = (data, path = []) => {
    const result = data.reduce(
      /**
       *
       * @param {Array} acc Аккумулятор.
       * @param {ASTNode} node Узел AST.
       * @returns {string}
       */
      (acc, node) => {
        // Устанавливаем описание состояния.
        const desc = stateToDesc[node.state] ?? ' ';

        // Если ASTNode имеет "детей", то делаем рекурсию.
        if (node?.type === ASTNodeType.INTERNAL) {
          return [...acc, iter(node.value, [...path, node.key])];
        }

        // Если свойство было добавлено.
        if (node?.state === ASTNodeState.ADDED) {
          return [
            ...acc,
            `Property '${makePath(
              path,
              node.key,
            )}' was ${desc} with value: ${formatValue(node.value)}`,
          ];
        }

        // Если свойство было изменено.
        if (node?.state === ASTNodeState.CHANGED) {
          return [
            ...acc,
            `Property '${makePath(
              path,
              node.key,
            )}' was ${desc}. From ${formatValue(
              node.oldValue,
            )} to ${formatValue(node.value)}`,
          ];
        }

        // Если свойство не было изменено.
        if (node?.state === ASTNodeState.UNCHANGED) {
          return [...acc];
        }

        return [...acc, `Property '${makePath(path, node.key)}' was removed`];
      },
      '',
    );

    return `${result.join('\n')}`;
  };
  return iter(tree, []);
};

export default plain;
