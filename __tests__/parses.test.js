/**
 * Модуль тестирования функции parses.
 * @module genDiff.test
 */

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { Options } from '../src/constants.js';
import { makeCorrectPath, readFilesSync, getFormat } from '../src/utils.js';
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

// Данные для парсинга.
const values = [
  {
    name: 'Парсинг данных.',
    data: [
      {
        files: ['file1.json', 'file1.yaml'],
      },
      {
        files: ['file2.json', 'file2.yml'],
      },
      {
        files: ['file3.json', 'file3.yaml'],
      },
      {
        files: [['file1.json', 'file2.yml']],
      },
      {
        files: ['file5.json', 'file5.yaml'],
      },
      {
        files: ['file6.json', 'file6.yaml'],
      },
      {
        files: ['correctPlain1.txt'],
      },
    ],
  },
];

// Тестирование парсинга файлов.
describe.each(values[0].data)('Чтение файлов.', ({ files, expected }) => {
  test.each(files)('Проверка %o.', (file) => {
    // Формируем пути.
    const correctPath = Array.isArray(file)
      ? makeCorrectPath([__dirname, '..', Options.fixturesDir], ...file)
      : [makeCorrectPath([__dirname, '..', Options.fixturesDir], file)];

    // Читаем файлы.
    const data = readFilesSync(...correctPath);

    // Определяем расширение.
    const extName = path.extname(file);

    expect(getData(getFormat(extName), ...data)).toEqual(
      JSON.parse(readFilesSync(...makeCorrectPath(...file)))
    );
  });

  test('Проверка на выброс ошибки.', () => {
    // Формируем пути.
    const correctPath = makeCorrectPath([], 'file10.html');

    console.log(correctPath);

    // Читаем файлы.
    const data = readFilesSync(...correctPath);

    // Определяем расширение.
    const extName = extname(file);

    expect(() => getData(getFormat(extName), ...data)).toThrow(
      new Error('Формат не поддерживается.')
    );
  });
});
