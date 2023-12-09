/**
 * Модуль форматера stylish.
 * @module stylish
 */

import { isObject } from '../utils.js';

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
   * @param {AST} data AST.
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
        const sign = 'state' in node ? stateToSign[node.state] : ' ';

        // Если элемент - массив.
        if (Array.isArray(node)) {
          return `${acc}\n${replacer.repeat(
            spacesCount * (depth + 1) - sign.length - 1
          )}${sign} ${node[0]}: ${
            isObject(node[1])
              ? iter(Object.entries(node[1]), depth + 1)
              : node[1]
          }`;
        }

        // Если ASTNode имеет "детей", либо значение - ссылочный тип, то делаем рекурсию.
        if (
          node?.type === 'internal' ||
          (isObject(node?.value) && node?.state !== 'changed')
        ) {
          return `${acc}\n${replacer.repeat(
            spacesCount * (depth + 1) - sign.length - 1
          )}${sign} ${node.key}: ${iter(
            Array.isArray(node?.value)
              ? node.value
              : Object.entries(node.value),
            depth + 1
          )}`;
        }

        // Если свойство было изменено.
        if (node?.state === 'changed') {
          return `${acc}\n${replacer.repeat(
            spacesCount * (depth + 1) - sign.length - 1
          )}- ${node.key}: ${
            isObject(node.oldValue)
              ? iter(Object.entries(node.oldValue), depth + 1)
              : node.oldValue
          }\n${replacer.repeat(spacesCount * (depth + 1) - sign.length - 1)}+ ${
            node.key
          }: ${
            isObject(node.value)
              ? iter(Object.entries(node.value), depth + 1)
              : node.value
          }`;
        }

        return `${acc}\n${replacer.repeat(
          spacesCount * (depth + 1) - sign.length - 1
        )}${sign} ${node.key}: ${node.value}`;
      },
      ''
    );

    return `{${result}\n${replacer.repeat(spacesCount * depth)}}`;
  };
  return iter(tree, 0);
};

export default stylish;
