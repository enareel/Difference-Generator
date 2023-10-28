/**
 * Модуль, отвечающий за парсинг файлов.
 * @module parsers
 */
import jsYaml from 'js-yaml';
import path from 'node:path';
import fs from 'node:fs';

/**
 * Функция чтения файлов. Синхронно.
 * @param {...string} filepaths Корректные пути.
 * @returns {Object|Object[]}
 */
const getFiles = (...filepaths) => {
  const files = filepaths.map((file) => {
    switch (path.extname(file)) {
      case '.yml':
      case '.yaml':
        return jsYaml.load(fs.readFileSync(file, 'utf-8'));
      case '.json':
        return JSON.parse(fs.readFileSync(file, 'utf-8'));
      default:
        throw new Error('Формат не поддерживается.');
    }
  });

  return files.length > 1 ? files : files.at();
};

export default getFiles;
