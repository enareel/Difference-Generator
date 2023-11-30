/**
 * Модуль форматтера plain.
 * @module plain
 */

import { isObject } from '../utils.js';

/**
 * Функция-форматтер, приводящая AST к стилю plain.
 * @param {AST} tree AST.
 * @returns {string}
 */
const plain = (tree) => {
  /**
   * Вспомогательная рекурсивная функция.
   * @param {AST} data AST.
   * @param {string} path Путь.
   * @returns {string}
   */
  const iter = (data, path) => {
    const result = data.reduce(
      /**
       *
       * @param {string} acc Аккумулятор.
       * @param {ASTNode} node Узел AST.
       * @returns {string}
       */
      (acc, node) => {
        // Устанавливаем описание.
        let desc = '';

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

        // Если элемент - массив.
        if (Array.isArray(node)) {
          console.log(node, isObject(node[1]));
          return `${acc}\n${replacer.repeat(
            spacesCount * (depth + 1) - sign.length - 1
          )} ${node[0]}: ${
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
            spacesCount * (depth + 1) - sign.length
          )}- ${node.key}: ${
            isObject(node.oldValue)
              ? iter(Object.entries(node.oldValue), depth + 1)
              : node.oldValue
          }\n${replacer.repeat(spacesCount * (depth + 1) - sign.length)}+ ${
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

export default plain;
