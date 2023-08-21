/**
 * Модуль функции, демонстрирующей различия между двумя объектами.
 * @module genDiff
 */

import { isObject, sortPairs, isEmptyObject } from './utils.js';

/**
 * Функция демонстрации различий между двумя объектами. Плоское сравнение.
 * @param {Object} firstObj Первый объект.
 * @param {Object} secondObj Второй объект.
 * @returns {string}
 */
const genDiff = ([firstObj, secondObj], replacer = ' ', spacesCount = 4) => {
  // Стэк с имеющимися свойствами.
  const stack = [];

  /**
   * Вспомогательная функция демонстрации различий между объектами. Рекурсия.
   * @param {number} depth Глубина.
   * @param {string} trace Путь.
   * @param {Object} leftObj Левый объект.
   * @param {Object} rightObj Правый объект.
   * @returns {string}
   */
  const iter = (leftObj, rightObj, depth = 0) => {
    const entries = [...Object.entries(leftObj), ...Object.entries(rightObj)];
    let hasPair =
      isEmptyObject(leftObj) || isEmptyObject(rightObj) ? false : true;
    const combObj = entries.sort(sortPairs).reduce((acc, [prop, value]) => {
      console.log(
        stack,
        acc,
        entries,
        prop,
        leftObj[prop],
        rightObj[prop],
        leftObj,
        rightObj
      );

      // Если одинаковое свойство уже есть в стэке.
      if (stack.includes(prop)) {
        return { ...acc };
      }

      // Определяем знак.
      let sign = '';

      // Определяем, какие свойства отличаются, а какие - нет.
      switch (true) {
        case !hasPair: {
          sign = '';
          break;
        }
        case !(prop in rightObj):
          sign = '- ';
          break;
        case prop in rightObj &&
          rightObj[prop] !== value &&
          !(isObject(leftObj[prop]) && isObject(rightObj[prop])):
          sign = '- ';
          break;
        case !(prop in leftObj):
          sign = '+ ';
          break;
        case prop in leftObj &&
          leftObj[prop] !== rightObj[prop] &&
          !(isObject(leftObj[prop]) && isObject(rightObj[prop])):
          sign = '+ ';
          break;
        default:
          sign = '';
          stack.push(prop);
          break;
      }

      // Если свойство - объект.
      if (isObject(value)) {
        console.log('is object,', value);
        return {
          ...acc,
          [`\n${replacer.repeat(
            depth - sign.length + spacesCount
          )}${sign}${prop}`]: iter(
            leftObj[prop] && isObject(leftObj[prop]) ? leftObj[prop] : {},
            rightObj[prop] && isObject(rightObj[prop]) ? rightObj[prop] : {},
            depth + 4
          ),
        };
      }
      return {
        ...acc,
        [`\n${replacer.repeat(
          depth - sign.length + spacesCount
        )}${sign}${prop}`]: value,
      };
    }, {});

    return `{${Object.entries(combObj)
      .map(([key, value]) => `${key}: ${value}`)
      .join('')}\n${replacer.repeat(depth)}}`;
  };

  return iter(firstObj, secondObj, 0, '');
};

export default genDiff;
