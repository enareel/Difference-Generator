/**
 * Модуль функции, демонстрирующей различия между двумя объектами.
 * @module genDiff
 */

import { isAllObjects, sortPairs } from './utils.js';

/**
 * Функция демонстрации различий между двумя объектами.
 * @param {Object} firstObj Первый объект.
 * @param {Object} secondObj Второй объект.
 * @returns {string}
 */
const genDiff = (firstObj, secondObj) => {
  // Стэк с имеющимися свойствами.
  const stack = [];

  /**
   * Вспомогательная рекурсивная функция.
   * @param {number} depth Глубина.
   * @param {string} trace Путь.
   * @param {Object} leftObj Левый объект.
   * @param {Object} rightObj Правый объект.
   * @returns {string}
   */
  const iter = (leftObj, rightObj) => {
    // Массив пар ключ=значение.
    const entries = [...Object.entries(leftObj), ...Object.entries(rightObj)];

    // Собираемый объект.
    const combObj = entries.sort(sortPairs).reduce((acc, [prop, value]) => {
      // Если одинаковое свойство уже есть в стэке, то ничего не делаем.
      if (stack.includes(prop)) {
        return { ...acc };
      }

      // Определяем состояние и тип свойства.
      let state = '';
      const type = 'leaf';

      // Определяем, какие свойства отличаются, а какие - нет.
      switch (true) {
        case !(prop in rightObj):
          state = 'deleted';
          break;
        case !(prop in leftObj):
          state = 'added';
          break;
        case prop in rightObj &&
          rightObj[prop] !== value &&
          !isAllObjects(leftObj[prop], rightObj[prop]):
          state = 'changed';
          stack.push(prop);
          break;
        case prop in leftObj &&
          leftObj[prop] !== rightObj[prop] &&
          !isAllObjects(leftObj[prop], rightObj[prop]):
          state = 'changed';
          stack.push(prop);
          break;
        default:
          state = '';
          stack.push(prop);
          break;
      }

      // Если оба свойства - объекты, делаем рекурсию.
      if (isAllObjects(leftObj[prop], rightObj[prop])) {
        return {
          ...acc,
          [prop]: {
            state,
            type: 'internal',
            value: iter(leftObj[prop], rightObj[prop]),
          },
        };
      }

      // Если свойство было изменено, добавляем новое и старое значения.
      if (state === 'changed') {
        console.log(
          JSON.stringify(rightObj[prop]),
          JSON.stringify(leftObj[prop])
        );
        return {
          ...acc,
          [prop]: {
            state,
            type,
            newValue: rightObj[prop],
            oldValue: leftObj[prop],
          },
        };
      }

      return { ...acc, [prop]: { state, type, value } };
    }, '');

    return combObj;
  };

  return iter(firstObj, secondObj, 0, '');
};

export default genDiff;
