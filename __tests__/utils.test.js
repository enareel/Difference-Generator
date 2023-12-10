/**
 * Модуль тестирования функций модуля utils.
 * @module utils.test
 */

import {
  sortPairs,
  isObject,
  isEmptyObject,
  isAllObjects,
  formatValue,
  makePath,
} from '../src/utils.js';

// Тестирование sortPairs.
describe('Тестируем функцию sortPairs.', () => {
  test('a[0] > b[0]', () => {
    expect(sortPairs([10, 'Test'], [2, 'Meow'])).toBe(1);
  });

  test('a[0] < b[0]', () => {
    expect(sortPairs([-10, 'Test'], [2, 'Meow'])).toBe(-1);
  });

  test('a[0] === b[0]', () => {
    expect(sortPairs([22, 'Test'], [22, 'Meow'])).toBe(0);
  });
});

// Тестирование isObject.
describe('Тестируем функцию isObject.', () => {
  test('Пустой объект.', () => {
    expect(isObject({})).toBe(true);
  });

  test('Обычный объект.', () => {
    expect(isObject({ a: 12, b: 'Hello' })).toBe(true);
  });

  test('Другой тип: массив.', () => {
    expect(isObject([])).toBe(false);
  });

  test('Другой тип: строка.', () => {
    expect(isObject('Hey!')).toBe(false);
  });
});

// Тестирование isEmptyObject.
describe('Тестируем функцию isEmptyObject.', () => {
  test('Пустой объект.', () => {
    expect(isEmptyObject({})).toBe(true);
  });

  test('Обычный объект.', () => {
    expect(isEmptyObject({ a: 12, b: 'Hello' })).toBe(false);
  });

  test('Другой тип: массив.', () => {
    expect(isEmptyObject([])).toBe(false);
  });

  test('Другой тип: число.', () => {
    expect(isEmptyObject(144)).toBe(false);
  });
});

// Тестирование isAllObjects.
describe('Тестируем функцию isAllObjects.', () => {
  test('Пустые объекты.', () => {
    expect(isAllObjects({}, {}, {})).toBe(true);
  });

  test('Обычные объекты.', () => {
    expect(
      isAllObjects({ a: 12, b: 'Hello' }, { z: 'v' }, { HASHTAG: 'METOO' })
    ).toBe(true);
  });

  test('Другие типы.', () => {
    expect(isAllObjects([], {}, { name: 'Tim' }, 12)).toBe(false);
  });
});


// Тестирование formatValue.
describe('Тестируем функцию formatValue.', () => {
  test('Массив.', () => {
    expect(formatValue([1, 2, 3])).toEqual('[complex value]');
  });
  
  test('Объект.', () => {
    expect(formatValue({})).toEqual('[complex value]');
  });

  test('Строка.', () => {
    expect(formatValue('Hello, Dear Boy!')).toEqual(`'Hello, Dear Boy!'`);
  });

  test.each([null, undefined, true, 1, 0, -10])('Значение: %o.', (value) => {
    expect(formatValue(value)).toEqual(value);
  });
});

// Тестирование formatValue.
describe('Тестируем функцию formatValue.', () => {
  test('Массив.', () => {
    expect(formatValue([1, 2, 3])).toEqual('[complex value]');
  });
  
  test('Объект.', () => {
    expect(formatValue({})).toEqual('[complex value]');
  });

  test('Строка.', () => {
    expect(formatValue('Hello, Dear Boy!')).toEqual(`'Hello, Dear Boy!'`);
  });

  test.each([null, undefined, true, 1, 0, -10])('Значение: %o.', (value) => {
    expect(formatValue(value)).toEqual(value);
  });
});

// Тестирование makePath.
describe('Тестируем функцию makePath.', () => {
  test('Пустой путь.', () => {
    expect(makePath([], 'key')).toBe('key');
  });
  
  test('Обычный путь.', () => {
    expect(makePath(['common', 'joe', 'make'], 'prop')).toBe('common.joe.make.prop');
  });
});
