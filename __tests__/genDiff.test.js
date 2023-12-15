/**
 * Модуль тестирования функции genDiff.
 * @module genDiff.test
 */

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { Options } from '../src/constants.js';
import { makeCorrectPath, getFormat } from '../src/utils.js';
import getData from '../src/parsers.js';
import genDiff from '../src/genDiff.js';

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
 * Префиксный путь до файлов.
 * @constant
 */
const prefixPath = [__dirname, '..', Options.fixturesDir];

// Данные для сравнения.
const data = [
  {
    name: 'Проверка плоских файлов JSON',
    data: [
      {
        file1: 'file1.json',
        file2: 'file2.json',
        expected: [
          {
            format: 'stylish',
            value: 'correctStylish1.txt',
          },
          {
            format: 'plain',
            value: 'correctPlain1.txt',
          },
          {
            format: 'json',
            value: 'correctJson1.txt',
          },
        ],
      },
      {
        file1: 'file1.json',
        file2: 'file3.json',
        expected: [
          {
            format: 'stylish',
            value: 'correctStylish2.txt',
          },
          {
            format: 'plain',
            value: 'correctPlain2.txt',
          },
          {
            format: 'json',
            value: 'correctJson2.txt',
          },
        ],
      },
    ],
  },
  {
    name: 'Проверка рекурсивных файлов JSON',
    data: [
      {
        file1: 'file5.json',
        file2: 'file6.json',
        expected: [
          {
            format: 'stylish',
            value: 'correctStylish3.txt',
          },
          {
            format: 'plain',
            value: 'correctPlain3.txt',
          },
          {
            format: 'json',
            value: 'correctJson3.txt',
          },
        ],
      },
    ],
  },
  {
    name: 'Проверка плоских файлов YAML',
    data: [
      {
        file1: 'file1.yaml',
        file2: 'file2.yml',
        expected: [
          {
            format: 'stylish',
            value: 'correctStylish1.txt',
          },
          {
            format: 'plain',
            value: 'correctPlain1.txt',
          },
          {
            format: 'json',
            value: 'correctJson1.txt',
          },
        ],
      },
      {
        file1: 'file1.yaml',
        file2: 'file3.yaml',
        expected: [
          {
            format: 'stylish',
            value: 'correctStylish2.txt',
          },
          {
            format: 'plain',
            value: 'correctPlain2.txt',
          },
          {
            format: 'json',
            value: 'correctJson2.txt',
          },
        ],
      },
    ],
  },
  {
    name: 'Проверка рекурсивных файлов YAML',
    data: [
      {
        file1: 'file5.yaml',
        file2: 'file6.yaml',
        expected: [
          {
            format: 'stylish',
            value: 'correctStylish3.txt',
          },
          {
            format: 'plain',
            value: 'correctPlain3.txt',
          },
          {
            format: 'json',
            value: 'correctJson3.txt',
          },
        ],
      },
    ],
  },
];

// Тесты.
describe.each(data)('$name.', ({ data }) => {
  test.each(data)('Проверка $file1 и $file2.', ({ file1, file2, expected }) => {
    const f1 = getData(getFormat(path.extname(file)), makeCorrectPath([]));
    const f2 = getFiles(makeCorrectPath(file2));

    // Проверяем правильность форматирования для каждого типа.
    expected.forEach(({ format, value }) => {
      const result = genDiff(f1, f2, format);

      expect(result).toEqual(value);
    });
  });
});
