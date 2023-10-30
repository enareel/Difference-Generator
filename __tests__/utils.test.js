/**
 * Модуль тестирования функций модуля utils.
 * @module utils.test
 */

import {
  isEmptyObject,
  isObject,
  isAllObjects,
  sortPairs,
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
  test('Пустой объект', () => {
    expect(isObject({})).toBe(true);
  });

  test('Обычный объект', () => {
    expect(isObject({ a: 12, b: 'Hello' })).toBe(true);
  });

  test('Другой тип: массив', () => {
    expect(isObject([])).toBe(false);
  });

  test('Другой тип: строка', () => {
    expect(isObject('Hey!')).toBe(false);
  });
});

// Тестирование isEmptyObject.
describe('Тестируем функцию isEmptyObject.', () => {
  test('Пустой объект', () => {
    expect(isEmptyObject({})).toBe(true);
  });

  test('Обычный объект', () => {
    expect(isEmptyObject({ a: 12, b: 'Hello' })).toBe(false);
  });

  test('Другой тип: массив', () => {
    expect(isEmptyObject([])).toBe(false);
  });

  test('Другой тип: число', () => {
    expect(isEmptyObject(144)).toBe(false);
  });
});

// Тестирование isAllObjects.
describe('Тестируем функцию isAllObjects.', () => {
  test('Пустые объекты', () => {
    expect(isAllObjects({}, {}, {})).toBe(true);
  });

  test('Обычные объекты', () => {
    expect(
      isAllObjects({ a: 12, b: 'Hello' }, { z: 'ov' }, { HASHTAG: 'METOO' })
    ).toBe(true);
  });

  test('Другие типы', () => {
    expect(isAllObjects([], {}, { name: 'Tim' }, 12)).toBe(false);
  });
});
