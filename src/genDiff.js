/**
 * Модуль функции, демонстрирующей различия между двумя объектами.
 * @module genDiff
 */

/**
 * Функция сортировки пар массива.
 * @param {Array} a Пара (массив из двух элементов).
 * @param {Array} b Пара (массив из двух элементов).
 * @returns {number}
 */
const sortPairs = (a, b) => {
  if (a[0] === b[0]) {
    return 0;
  }
  return a[0] > b[0] ? 1 : -1;
};

const isObject = (value) =>
  typeof value === 'object' && value instanceof Object;

/**
 * Функция демонстрации различий между двумя объектами. Плоское сравнение.
 * @param {Object} firstObj Первый объект.
 * @param {Object} secondObj Второй объект.
 * @returns {string}
 */
const genDiff = ([firstObj, secondObj], space = ' ') => {
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
  const iter = (leftObj = {}, rightObj = {}, depth = 0, trace = '') => {
    const entries = [...Object.entries(leftObj), ...Object.entries(rightObj)];

    const combObj = entries.sort(sortPairs).reduce((acc, [prop, value]) => {
      console.log(
        acc,
        entries,
        prop,
        leftObj[prop],
        rightObj[prop],
        leftObj,
        rightObj
      );
      // Определяем знак.
      let sign = '';

      // Определяем, какие свойства отличаются, а какие - нет.
      switch (true) {
        case !(prop in rightObj):
          sign = '- ';
          break;
        case prop in rightObj &&
          rightObj[prop] !== value &&
          !(isObject(leftObj[prop]) === isObject(rightObj[prop])):
          sign = '- ';
          break;
        case !(prop in leftObj):
          sign = '+ ';
          break;
        case prop in leftObj &&
          leftObj[prop] !== rightObj[prop] &&
          !(isObject(leftObj[prop]) === isObject(rightObj[prop])):
          sign = '+ ';
          break;
        default:
          sign = ' ';
          break;
      }

      if (isObject(value)) {
        return {
          ...acc,
          [`\n${space.repeat(depth)}${sign}${prop}`]: iter(
            leftObj[prop] || !isObject(leftObj[prop]) ? leftObj[prop] : {},
            rightObj[prop] || !isObject(rightObj[prop]) ? rightObj[prop] : {},
            depth + 1,
            `${trace}.${prop}`
          ),
        };
      }
      return { ...acc, [`\n${space.repeat(depth)}${sign}${prop}`]: value };
    }, {});

    return `{${Object.entries(combObj)
      .map(([key, value]) => `${key}: ${value}`)
      .join('')}${space.repeat(depth)}\n}`;
  };

  return iter(firstObj, secondObj, 0, '');
};

export default genDiff;
