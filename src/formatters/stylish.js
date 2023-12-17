/**
 * Модуль форматера stylish.
 * @module stylish
 */

import { ASTNodeType, ASTNodeState } from '../constants.js';
import { isObject, getBreak } from '../utils.js';

/**
 * Определение типа StateSignMap.
 * @typedef {Object}
 * @prop {string} added Знак состояния "добавлено".
 * @prop {string} deleted Знак состояния "удалено".
 * @prop {string} changed Знак состояния "изменено".
 * @prop {string} unchanged Знак состояния "не изменено".
 */

/**
 * Словарь состояний и знаков.
 * @type {StateSignMap}
 */
const stateToSign = {
  added: '+',
  deleted: '-',
  changed: ' ',
  unchanged: ' ',
};

/**
 * Функция-форматер, приводящая AST к стилю stylish.
 * @param {AST} tree AST.
 * @param {string} replacer Реплейсер.
 * @param {number} spacesCount Количество отступов.
 * @returns {string}
 */
const stylish = (tree, replacer = ' ', spacesCount = 4) => {
  /**
   * Вспомогательная рекурсивная функция.
   * @param {(AST|Array<Array>)} data AST.
   * @param {number} [depth=0] Глубина.
   * @returns {string}
   */
  const iter = (data, depth = 0) => {
    const result = data.reduce(
      /**
       *
       * @param {string} acc Аккумулятор.
       * @param {ASTNode} node Узел AST.
       * @returns {string}
       */
      (acc, node) => {
        // Устанавливаем знак.
        const sign = stateToSign[node.state] ?? ' ';

        // Если элемент - массив.
        if (Array.isArray(node)) {
          return [
            ...acc,
            `${getBreak({
              sign,
              replacer,
              spacesCount,
              depth,
            })}${sign} ${node[0]}: ${
              isObject(node[1])
                ? iter(Object.entries(node[1]), depth + 1)
                : node[1]
            }`,
          ];
        }

        // Если ASTNode имеет "детей", либо значение - ссылочный тип, то делаем рекурсию.
        if (
          node?.type === ASTNodeType.INTERNAL ||
          (isObject(node?.value) && node?.state !== ASTNodeState.CHANGED)
        ) {
          return [
            ...acc,
            `${getBreak({
              sign,
              replacer,
              spacesCount,
              depth,
            })}${sign} ${node.key}: ${iter(
              Array.isArray(node?.value)
                ? node.value
                : Object.entries(node.value),
              depth + 1,
            )}`,
          ];
        }

        // Если свойство было изменено.
        if (node?.state === ASTNodeState.CHANGED) {
          return [
            ...acc,
            `${getBreak({
              sign,
              replacer,
              spacesCount,
              depth,
            })}- ${node.key}: ${
              isObject(node.oldValue)
                ? iter(Object.entries(node.oldValue), depth + 1)
                : node.oldValue
            }`,
            `${getBreak({
              sign,
              replacer,
              spacesCount,
              depth,
            })}+ ${node.key}: ${
              isObject(node.value)
                ? iter(Object.entries(node.value), depth + 1)
                : node.value
            }`,
          ];
        }

        return [
          ...acc,
          `${getBreak({
            sign,
            replacer,
            spacesCount,
            depth,
          })}${sign} ${node.key}: ${node.value}`,
        ];
      },
      [],
    );

    return `{${result.join('')}${getBreak({
      hasClosure: true,
      depth,
    })}}`;
  };
  return iter(tree, 0);
};

export default stylish;
