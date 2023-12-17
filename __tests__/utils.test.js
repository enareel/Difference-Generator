/**
 * Модуль тестирования функций модуля utils.
 * @module utils.test
 */

import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { QuotationMark, ENCODING, Options } from '../src/constants.js';
import {
  sortPairs,
  isObject,
  isEmptyObject,
  isAllObjects,
  formatValue,
  makePath,
  makeCorrectPath,
  readFileSync,
  getFormat,
  getBreak,
} from '../src/utils.js';

/**
 * Абсолютный путь до текущего файла на основе URL модуля.
 * @constant
 */
const __filename = fileURLToPath(import.meta.url);

/**
 * Абсолютный путь до папки с текущим файлом.
 * @constant
 */
const __dirname = path.dirname(__filename);

/**
 * Префиксный путь до файла.
 * @constant
 */
const prefixPath = [__dirname, '..', Options.fixturesDir];

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
      isAllObjects({ a: 12, b: 'Hello' }, { z: 'v' }, { HASHTAG: 'METOO' }),
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
    expect(formatValue('Hello, Dear Boy!')).toEqual("'Hello, Dear Boy!'");
  });

  test.each([null, undefined, true, 1, 0, -10])('Значение: %o.', (value) => {
    expect(formatValue(value)).toEqual(value);
  });
});

// Тестирование makePath.
describe('Тестируем функцию makePath.', () => {
  test('Пустой путь.', () => {
    expect(makePath([], 'key')).toEqual('key');
  });

  test('Обычный путь.', () => {
    expect(makePath(['common', 'joe', 'make'], 'prop')).toEqual(
      'common.joe.make.prop',
    );
  });
});

// Тестирование makeCorrectPath.
describe('Тестируем функцию makeCorrectPath.', () => {
  test('Обычный файл без префикса.', () => {
    expect(makeCorrectPath([], '/file5.json')).toEqual('/file5.json');
  });

  test('Обычный файл с префиксом.', () => {
    expect(
      makeCorrectPath(['/dir', 'project', '__fixtures__'], 'file2.json'),
    ).toEqual('/dir/project/__fixtures__/file2.json');
  });

  test('Обычный файл с префиксом. Асолютный путь.', () => {
    expect(
      makeCorrectPath(
        ['/a', '..', 'b', '__fixtures__'],
        '/usr/etc/folder/file3.txt',
      ),
    ).toEqual('/usr/etc/folder/file3.txt');
  });
});

// Тестирование readFileSync.
describe('Тестируем функцию readFileSync.', () => {
  test('Один файл.', () => {
    expect(readFileSync(makeCorrectPath(prefixPath, 'file1.json'))).toEqual(
      fs.readFileSync(makeCorrectPath(prefixPath, 'file1.json'), {
        encoding: ENCODING,
      }),
    );
  });
});

// Тестирование getFormat.
describe('Тестируем функцию getFormat.', () => {
  test('Формат JSON.', () => {
    expect(getFormat('.json')).toBe('JSON');
  });

  test.each(['.yaml', '.yml'])('Формат YAML.', (extName) => {
    expect(getFormat(extName)).toBe('YAML');
  });

  test('Формат TXT.', () => {
    expect(getFormat('.txt')).toBe('TXT');
  });
});

// Тестирование getBreak.
describe('Тестируем функцию getBreak.', () => {
  test('Значения по умолчанию.', () => {
    expect(getBreak()).toBe('\n   ');
  });

  test('hasClosure.', () => {
    expect(getBreak({ hasClosure: true })).toBe('\n');
  });

  test('Различные значения', () => {
    expect(
      getBreak({
        hasClosure: false,
        sign: '@@@',
        replacer: '#',
        spacesCount: 3,
        depth: 2,
      }),
    ).toBe('\n#####');
  });
});
