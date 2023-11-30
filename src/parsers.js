/**
 * Модуль функции, отвечающей за парсинг файлов.
 * @module parsers
 */
import jsYaml from 'js-yaml';
import path from 'node:path';
import fs from 'node:fs';

/**
 * Функция, отвечающая за парсинг файлов. Синхронно.
 * @param {...string} filepaths Корректные пути.
 * @returns {(Object|Object[])}
 */
const getFiles = (...filepaths) => {
  const files = filepaths.map((filepath) => {
    switch (path.extname(filepath)) {
      case '.yml':
      case '.yaml':
        return jsYaml.load(fs.readFileSync(filepath, 'utf-8'));
      case '.json':
        return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
      default:
        throw new Error('Формат не поддерживается.');
    }
  });

  return files.length > 1 ? files : files.at();
};

export default getFiles;
