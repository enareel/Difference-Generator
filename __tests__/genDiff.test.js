/**
 * Модуль тестирования функции genDiff.
 * @module genDiff.test
 */
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import genDiff from '../src/genDiff.js';
import getFiles from '../src/parsers.js';
import stylish from '../src/stylish.js';

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

// JSON данные для сравнения, используя форматтер stylish.
const stylishJSON = [
  {
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
    name: 'Проверка плоских файлов YAML',
    data: [
      {
        file1: 'file1.yaml',
        file2: 'file2.yml',
        expected: `
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true`,
      },
      {
        file1: 'file1.yaml',
        file2: 'file3.yaml',
        expected: `
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50`,
      },
    ],
  },
];

// Формат stylish
describe.each(stylishJSON)('Формат stylish. $name', ({ data }) => {
  // Тесты, используя фикстуры.
  test.each(data)('Проверка $file1 и $file2', ({ file1, file2, expected }) => {
    const filepath1 = getFiles(makeCorrectPath(file1));
    const filepath2 = getFiles(makeCorrectPath(file2));
    const result = stylish(genDiff(filepath1, filepath2));

    expect(result).toEqual(expected);
  });
});
