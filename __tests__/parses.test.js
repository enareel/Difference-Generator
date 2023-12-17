/**
 * Модуль тестирования функции parses.
 * @module genDiff.test
 */

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import jsYaml from 'js-yaml';
import { FORMAT_ERROR, Options } from '../src/constants.js';
import { makeCorrectPath, readFileSync, getFormat } from '../src/utils.js';
import getData from '../src/parsers.js';

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

// Данные для парсинга.
const values = [
  {
    name: 'Парсинг данных.',
    data: [
      {
        data: 'file1.json',
        parser: JSON.parse,
      },
      {
        data: 'file6.yaml',
        parser: jsYaml.load,
      },
      {
        data: 'correctPlain1.txt',
      },
    ],
  },
];

// Тестирование парсинга файлов.
describe.each(values)('$name', ({ data }) => {
  test.each(data)('Проверка $data.', ({ data, parser }) => {
    // Формируем путь до файла.
    const correctPath = makeCorrectPath(prefixPath, data);

    // Читаем файл.
    const element = readFileSync(correctPath);

    // Определяем расширение.
    const extName = path.extname(data);
    
    // Вычисляем actual.
    const actual = getData(getFormat(extName), element);
    
    // Вычисляем expected.
    const expected = parser ? parser(element) : element;

    expect(actual).toEqual(expected);
  });
});

test('Проверка на выброс ошибки.', () => {
  // Название файла.
  const file = 'file1.html';

  // Формируем путь до файла.
  const correctPath = makeCorrectPath(
    prefixPath,
    file
  );

  // Читаем файл.
  const element = readFileSync(correctPath);

  // Определяем расширение.
  const extName = path.extname(file);

  expect(() => getData(getFormat(extName), element)).toThrow(
    new Error(FORMAT_ERROR)
  );
});
