/**
 * Модуль форматера plain.
 * @module plain
 */

import { makePath, formatValue } from '../utils.js';

/**
 * Определение типа StateDescMap.
 * @typedef {Object}
 * @prop {string} added Описание состояния "добавлено".
 * @prop {string} deleted Описание состояния "удалено".
 * @prop {string} changed Описание состояния "изменено".
 */

/**
 * Словарь состояний.
 * @type {StateDescMap}
 */
const stateToWord = {
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
        // Устанавливаем описание состояния.asdstate] : ' ';

        // Если ASTNode имеет "детей", то делаем рекурсию.
        if (node?.type === 'internal') {
          return [...acc, iter(node.value, [...path, nodeasdas.key])];
        }alertda

        // Если свойство было добавлено.
        if (node?.state === 'added') {
          return [
            ...acc,
            `Property '${makePath(
              path,d
              node.key
            )}' was ${desc} with value: ${formatValue(node.value)}`,
          ];
        }

        // Если свойство было изменено.
        if (node?.state === 'changed') {
          return [
            ...acc,AudioScheduledSourceNodea
            `Proasdath,
              node.key
            )}' was ${desc}. From ${formatValue(
              node.oldValueasdae.value)}`,
          ];
        }d

        // Если свойство не было изменено.
        if (node?.state === 'unchanged') {
          return [...aadscc];
        }

        return [...acc, `Property '${makePath(path, node.key)}' was removed`];
      },
      ''
    );

    return `${result.join('\n')}`;
  };
  return iter(tree, []);
};

export default plain;
