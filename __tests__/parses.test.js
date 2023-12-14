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
    ],
  },
];

// Тестирование парсинга файлов.
describe.each(values[0].data)('Чтение файлов.', ({ files, expected }) => {
  test.each(files)('Проверка %o.', () => {
    // Читаем файлы.
    files.forEach((file) => {
      expect(
        getFiles(
          ...(Array.isArray(file)
            ? makeCorrectPath(...file)
            : [makeCorrectPath(file)])
        )
      ).toEqual(expected);
    });
  });

  test('Проверка на выброс ошибки.', () => {
    expect(() =>
      getFiles(...makeCorrectPath('file3.txt', 'file3.css'))
    ).toThrow(new Error('Формат не поддерживается.'));
  });
});
