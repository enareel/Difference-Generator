/**
 * Модуль тестирования функции parses.
 * @module genDiff.test
 */

import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import getFiles from '../src/parsers.js';

// Вспомогательные данные.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Функция создания корректных путей до файлов.
 * @param {...string} paths Пути до файлов (абс. или относ.).
 * @returns {string|string[]}
 */
const makeCorrectPath = (...filepaths) => {
  const correctPath = filepaths.map((item) =>
    path.resolve(__dirname, '..', '__fixtures__', item)
  );
  if (correctPath.length > 1) {
    return correctPath;
  }
  return correctPath.at();
};

// Данные для чтения.
const values = [
  {
    name: 'Чтение файлов',
    data: [
      {
        files: ['file1.json', 'file1.yaml'],
        expected: {
          host: 'hexlet.io',
          timeout: 50,
          proxy: '123.234.53.22',
          follow: false,
        },
      },
      {
        files: ['file2.json', 'file2.yml'],
        expected: {
          timeout: 20,
          verbose: true,
          host: 'hexlet.io',
        },
      },
      {
        files: ['file3.json', 'file3.yaml'],
        expected: {},
      },
      {
        files: [['file1.json', 'file2.yml']],
        expected: [
          {
            host: 'hexlet.io',
            timeout: 50,
            proxy: '123.234.53.22',
            follow: false,
          },
          {
            timeout: 20,
            verbose: true,
            host: 'hexlet.io',
          },
        ],
      },
      {
        files: ['file5.json', 'file5.yaml'],
        expected: {
          common: {
            setting1: 'Value 1',
            setting2: 200,
            setting3: true,
            setting6: {
              key: 'value',
              doge: {
                wow: '',
              },
            },
          },
          group1: {
            baz: 'bas',
            foo: 'bar',
            nest: {
              key: 'value',
            },
          },
          group2: {
            abc: 12345,
            deep: {
              id: 45,
            },
          },
        },
      },
      {
        files: ['file6.json', 'file6.yaml'],
        expected: {
          common: {
            follow: false,
            setting1: 'Value 1',
            setting3: null,
            setting4: 'blah blah',
            setting5: {
              key5: 'value5',
            },
            setting6: {
              key: 'value',
              ops: 'vops',
              doge: {
                wow: 'so much',
              },
            },
          },
          group1: {
            foo: 'bar',
            baz: 'bars',
            nest: 'str',
          },
          group3: {
            deep: {
              id: {
                number: 45,
              },
            },
            fee: 100500,
          },
        },
      },
    ],
  },
];

// Тестирование парсинга файлов.
describe.each(values)('$name', ({ data }) => {
  test.each(data)('Проверка $files', ({ files, expected }) => {
    // Читаем файлы.
    files.forEach((item) => {
      expect(
        getFiles(
          ...(Array.isArray(item)
            ? makeCorrectPath(...item)
            : [makeCorrectPath(item)])
        )
      ).toEqual(expected);
    });
  });

  test('Проверка на выброс ошибки', () => {
    expect(() =>
      getFiles(...makeCorrectPath('file3.txt', 'file3.css'))
    ).toThrow(new Error('Формат не поддерживается.'));
  });
});
