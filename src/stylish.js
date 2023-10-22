/**
 * Модуль форматтера stylish.
 * @module stylish
 */

import { isObject } from './utils.js';

const stylish = (tree, replacer = ' ', spacesCount = 4) => {
  const iter = (data, depth = 0) => {
    const result = Object.entries(data).reduce((acc, [prop, rest]) => {
      // Устанавливаем знак.
      let sign = '';

      // Определяем знак в зависимости от состояния.
      switch (rest?.state) {
        case 'added':
          sign = '+ ';
          break;
        case 'deleted':
          sign = '- ';
          break;
        default:
          sign = '  ';
          break;
      }

      console.log(
        prop,
        isObject(rest),
        rest?.state,
        rest?.type,
        rest.hasOwnProperty('type')
      );

      // Если свойство имеет "детей".
      if (
        rest?.type === 'internal' ||
        (!rest.hasOwnProperty('type') && isObject(rest)) ||
        isObject(rest?.value)
      ) {
        return `${acc}\n${replacer.repeat(
          depth - sign.length + spacesCount
        )}${sign}${prop}: ${iter(rest?.value ?? rest, depth + 4)}`;
      }

      // Если свойство было изменено.
      if (rest?.state === 'changed') {
        return `${acc}\n${replacer.repeat(
          depth - sign.length + spacesCount
        )}- ${prop}: ${
          isObject(rest.oldValue)
            ? iter(Object.entries(rest.oldValue), depth + 4)
            : rest.oldValue
        }\n${replacer.repeat(depth - sign.length + spacesCount)}+ ${prop}: ${
          isObject(rest.newValue)
            ? iter(Object.entries(rest.newValue), depth + 4)
            : rest.newValue
        }`;
      }

      return `${acc}\n${replacer.repeat(
        depth - sign.length + spacesCount
      )}${sign}${prop}: ${rest.value ?? rest}`;
    }, ' ');

    return `{${result}\n${replacer.repeat(depth)}}`;
  };
  return iter(tree, 0);
};

export default stylish;
