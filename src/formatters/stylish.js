/**
 * Модуль форматтера stylish.
 * @module stylish
 */

import { isObject } from '../utils.js';

/**
 * Функция-форматтер, приводящая AST к стилю stylish.
 * @param {AST} tree AST.
 * @param {string} replacer Реплейсер.
 * @param {number} spacesCount Количество отступов.
 * @returns {string}
 */
const stylish = (tree, replacer = ' ', spacesCount = 4) => {
  /**
   * Вспомогательная рекурсивная функция.
   * @param {AST} data AST.
   * @param {number} depth Глубина.
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
        let sign = '';

        // Определяем знак в зависимости от состояния.
        switch (node?.state) {
          case 'added':
            sign = '+';
            break;
          case 'deleted':
            sign = '-';
            break;
          default:
            sign = '  ';
            break;
        }

        // Если ASTNode имеет "детей", либо значение - ссылочный тип, то делаем рекурсию.
        if (
          node?.type === 'internal' ||
          isObject(node?.value) ||
          (!Object.prototype.hasOwnProperty.call(node, 'type') &&
            isObject(node))
        ) {
          return `${acc}\n${replacer.repeat(
            spacesCount * (depth + 1) - sign.length - 1
          )}${sign} ${prop}: ${iter(rest?.value ?? rest, depth + 1)}`;
        }

        // Если свойство было изменено.
        if (rest?.state === 'changed') {
          return `${acc}\n${replacer.repeat(
            spacesCount * (depth + 1) - sign.length
          )}- ${prop}: ${
            isObject(rest.oldValue)
              ? iter(rest.oldValue, depth + 1)
              : rest.oldValue
          }\n${replacer.repeat(
            spacesCount * (depth + 1) - sign.length
          )}+ ${prop}: ${
            isObject(rest.newValue)
              ? iter(rest.newValue, depth + 1)
              : rest.newValue
          }`;
        }

        return `${acc}\n${replacer.repeat(
          spacesCount * (depth + 1) - sign.length - 1
        )}${sign} ${prop}: ${rest.value ?? rest}`;
      },
      ''
    );

    return `{${result}\n${replacer.repeat(spacesCount * depth)}}`;
  };
  return iter(tree, 0);
};

export default stylish;
