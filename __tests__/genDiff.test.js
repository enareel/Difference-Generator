/**
 * Модуль тестирования функции genDiff.
 * @module genDiff.test
 */

import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import getFiles from '../src/parsers.js';
import genDiff from '../src/genDiff.js';

// Вспомогательные данные.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Функция создания корректного пути до файла.
 * @param {string} filepath Путь до файла (абс. или относ.).
 * @returns {string}
 */
const makeCorrectPath = (filepath) =>
  path.join(__dirname, '..', '__fixtures__', filepath);

// Данные для сравнения, используя форматтер stylish.
const stylishValues = [
  {
    type: 'stylish',
    name: 'Проверка плоских файлов JSON',
    data: [
      {
        file1: 'file1.json',
        file2: 'file2.json',
        expected: `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
      },
      {
        file1: 'file1.json',
        file2: 'file3.json',
        replacer: 'X',
        spacesCount: 10,
        expected: `{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`,
      },
    ],
  },
  {
    name: 'Проверка рекурсивных файлов JSON',
    data: [
      {
        file1: 'file5.json',
        file2: 'file6.json',
        // prettier-ignore
        expected: `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`,
      },
    ],
  },
  {
    name: 'Проверка плоских файлов YAML',
    data: [
      {
        file1: 'file1.yaml',
        file2: 'file2.yml',
        replacer: '*',
        spacesCount: 3,
        expected: `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
      },
      {
        file1: 'file1.yaml',
        file2: 'file3.yaml',
        expected: `{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`,
      },
    ],
  },
];

// Формат stylish
describe.each(stylishValues)('Формат stylish. $name.', ({ data }) => {
  test.each(data)('Проверка $file1 и $file2.', ({ file1, file2, type, expected }) => {
    const f1 = getFiles(makeCorrectPath(file1));
    const f2 = getFiles(makeCorrectPath(file2));
    const result = genDiff(f1, f2, type);

    expect(result).toEqual(expected);
  });
});
