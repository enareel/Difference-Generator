/**
 * Модуль тестирования функции genDiff
 * @module genDiff.test
 */
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import genDiff from '../src/genDiff.js';

// Вспомогательные данные.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Функция создания корректного пути до файла.
 * @param {string} filepath Путь до файла.
 * @returns {string}
 */
const makeCorrectPath = (filepath) =>
  path.join(__dirname, '..', '__fixtures__', filepath);

/**
 * Функция чтения файла.
 * @param {string} file Корректный путь до файла.
 * @returns {Object}
 */
const getFile = (file) => fs.readFile(makeCorrectPath(file), 'utf-8');

// Тесты, используя фикстуры.
test('Проверка обычных файлов', async () => {
  const file1 = JSON.parse(await getFile('file1.json'));
  const file2 = JSON.parse(await getFile('file2.json'));

  expect(genDiff([file1, file2])).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test('Проверка обычного и пустого файлов', async () => {
  const file1 = JSON.parse(await getFile('file1.json'));
  const file2 = JSON.parse(await getFile('file3.json'));

  expect(genDiff([file1, file2])).toEqual(`{
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
