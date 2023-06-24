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

/**
 * Функция демонстрации различий между двумя объектами. Плоское сравнение.
 * @param {Object} firstObj Первый объект.
 * @param {Object} secondObj Второй объект.
 * @returns {string}
 */
const genDiff = ([firstObj, secondObj], space = ' ') => {
  const combEntries = [
    ...Object.entries(firstObj),
    ...Object.entries(secondObj),
  ];

  // Формируем (рекурсивно) объект записей.
  const combObj = combEntries.sort(sortPairs).reduce((acc, cur) => {
    const [prop, value] = cur;
    let sign = '  ';

    console.log(
      !secondObj[prop] || (secondObj[prop] && secondObj[prop] !== value)
    );

    // Устанавливаем знак.
    if (
      !(prop in secondObj) ||
      (prop in secondObj && secondObj[prop] !== value)
    ) {
      sign = '- ';
    } else if (
      !(prop in firstObj) ||
      (prop in firstObj && firstObj[prop] !== secondObj[prop])
    ) {
      sign = '+ ';
    }

    // Проверяем наличие в аккумуляторе
    return { ...acc, [`${space.repeat(2)}${sign}${prop}`]: value };
  }, []);

  return `{\n${Object.entries(combObj)
    .map((pair) => pair.join(': '))
    .join(',\n')}\n}`;
};

export default genDiff;
