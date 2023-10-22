/**
 * Модуль тестирования функции genDiff
 * @module genDiff.test
 */
import fs from 'node:fs/promises';
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

// Формат stylish
describe('Формат stylish', () => {
  // Тесты, используя фикстуры.
  test('Проверка обычных файлов JSON', () => {
    const file1 = stylish(getFiles(makeCorrectPath('file1.json')));
    const file2 = stylish(getFiles(makeCorrectPath('file2.json')));

    expect(genDiff(file1, file2)).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  });

  test('Проверка обычного и пустого файлов', async () => {
    const file1 = stylish(getFiles(makeCorrectPath('file1.json')));
    const file2 = stylish(getFiles(makeCorrectPath('file3.json')));

    expect(genDiff(file1, file2)).toEqual(`{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`);

    expect(genDiff([file2, file1])).toEqual(`{
  + follow: false
  + host: hexlet.io
  + proxy: 123.234.53.22
  + timeout: 50
}`);
  });
});
