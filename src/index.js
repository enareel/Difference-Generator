/**
 * Модуль реэкспорта.
 * @module index
 */

import genDiff from './genDiff.js';
import stylish from './stylish.js';

export default (file1, file2, style) => {
  switch (style) {
    case 'stylish':
      return stylish(genDiff(file1, file2));
    case 'js':
      return stylish(genDiff(file1, file2));
    default:
      throw new Error('Выбран неверный стиль форматирования.');
  }
};
