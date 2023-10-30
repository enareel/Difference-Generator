/**
 * Модуль форматтера stylish.
 * @module stylish
 */

import { isObject } from './utils.js';

/**
 * Функция-форматтер, приводящая дерево к стилю stylish.
 * @param {Object} tree Дерево.
 * @param {string} replacer Реплейсер.
 * @param {number} spacesCount Количество отступов.
 * @returns {string}
 */
const stylish = (tree, replacer = ' ', spacesCount = 4) => {
  /**
   * Вспомогательная рекурсивная функция.
   * @param {Object} data Дерево.
   * @param {number} depth Глубина.
   * @returns {string}
   */
  const iter = (data, depth = 0) => {
    const result = Object.entries(data).reduce((acc, [prop, rest]) => {
      // Устанавливаем знак.
      let sign = '';

      // Определяем знак в зависимости от состояния.
      switch (rest?.state) {
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

      // Если свойство имеет "детей", либо значение - ссылочный тип, то делаем рекурсию.
      if (
        rest?.type === 'internal' ||
        isObject(rest?.value) ||
        (!Object.prototype.hasOwnProperty.call(rest, 'type') && isObject(rest))
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
    }, '');

    return `{${result}\n${replacer.repeat(spacesCount * depth)}}`;
  };
  return iter(tree, 0);
};

export default stylish;
