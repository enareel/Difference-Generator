/**
 * Модуль тестирования функции genDiff.
 * @module genDiff.test
 */

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { Options } from '../src/constants.js';
import { makeCorrectPath, readFileSync, getFormat } from '../src/utils.js';
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
 * Префиксный путь до файла.
 * @constant
 */
const prefixPath = [__dirname, '..', Options.fixturesDir];

// Данные для сравнения.
const values = [
  {
    name: 'Проверка плоских файлов JSON',
    data: [
      {
        filename1: 'file1.json',
        filename2: 'file2.json',
        expected: [
          {
            format: 'stylish',
            filename: 'correctStylish1.txt',
          },
          {
            format: 'plain',
            filename: 'correctPlain1.txt',
          },
          {
            format: 'json',
            filename: 'correctJson1.txt',
          },
        ],
      },
      {
        filename1: 'file1.json',
        filename2: 'file3.json',
        expected: [
          {
            format: 'stylish',
            filename: 'correctStylish2.txt',
          },
          {
            format: 'plain',
            filename: 'correctPlain2.txt',
          },
          {
            format: 'json',
            filename: 'correctJson2.txt',
          },
        ],
      },
    ],
  },
  {
    name: 'Проверка рекурсивных файлов JSON',
    data: [
      {
        filename1: 'file5.json',
        filename2: 'file6.json',
        expected: [
          {
            format: 'stylish',
            filename: 'correctStylish3.txt',
          },
          {
            format: 'plain',
            filename: 'correctPlain3.txt',
          },
          {
            format: 'json',
            filename: 'correctJson3.txt',
          },
        ],
      },
    ],
  },
  {
    name: 'Проверка плоских файлов YAML',
    data: [
      {
        filename1: 'file1.yaml',
        filename2: 'file2.yml',
        expected: [
          {
            format: 'stylish',
            filename: 'correctStylish1.txt',
          },
          {
            format: 'plain',
            filename: 'correctPlain1.txt',
          },
          {
            format: 'json',
            filename: 'correctJson1.txt',
          },
        ],
      },
      {
        filename1: 'file1.yaml',
        filename2: 'file3.yaml',
        expected: [
          {
            format: 'stylish',
            filename: 'correctStylish2.txt',
          },
          {
            format: 'plain',
            filename: 'correctPlain2.txt',
          },
          {
            format: 'json',
            filename: 'correctJson2.txt',
          },
        ],
      },
    ],
  },
  {
    name: 'Проверка рекурсивных файлов YAML',
    data: [
      {
        filename1: 'file5.yaml',
        filename2: 'file6.yaml',
        expected: [
          {
            format: 'stylish',
            filename: 'correctStylish3.txt',
          },
          {
            format: 'plain',
            filename: 'correctPlain3.txt',
          },
          {
            format: 'json',
            filename: 'correctJson3.txt',
          },
        ],
      },
    ],
  },
];

// Тесты.
describe.each(values)('$name.', ({ data }) => {
  test.each(data)(
    'Проверка $filename1 и $filename2.',
    ({ filename1, filename2, expected }) => {
      // Проверяем правильность форматирования для каждого типа.
      expected.forEach(({ format, filename }) => {
        // Формируем путь до файла с правильным результатом.
        const correctPath = makeCorrectPath(prefixPath, filename);

        // Читаем файл с правильным результатом.
        const fileContent = readFileSync(correctPath);

        // Определяем расширение файла с правильным результатом.
        const extName = path.extname(filename);

        // Вычисляем actual.
        const actual = genDiff(filename1, filename2, format);

        // Вычисляем expected.
        const expected = getData(getFormat(extName), fileContent);

        expect(actual).toEqual(expected);
      });
    }
  );

  test('Проверка значений по умолчанию.', () => {
    // Названия файлов.
    const filename1 = 'file1.json';
    const filename2 = 'file3.json';
    const filename = 'correctStylish2.txt';

    // Формируем путь до файла с правильным результатом.
    const correctPath = makeCorrectPath(prefixPath, filename);

    // Читаем файл с правильным результатом.
    const fileContent = readFileSync(correctPath);

    // Определяем расширение файла с правильным результатом.
    const extName = path.extname(filename);

    // Вычисляем actual.
    const actual = genDiff(filename1, filename2);

    // Вычисляем expected.
    const expected = getData(getFormat(extName), fileContent);

    expect(actual).toEqual(expected);
  });
});
