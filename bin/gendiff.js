#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'node:fs';

// Вспомогательные переменные
const data = {
  NAME: 'gendiff',
  VERSION: '0.0.1',
  DESCRIPTION: 'Compares two configuration files and shows a difference.',
  PATH: `${process.cwd()}/src`,
};

/**
 * Функция сортировки пар массива
 * @param {Array} a Пара (массив из двух элементов)
 * @param {Array} b Пара (массив из двух элементов)
 * @returns
 */
const sortPairs = (a, b) => {
  if (a[0] === b[0]) {
    return 0;
  }
  return a[0] > b[0] ? 1 : -1;
};

/**
 * Функция демонстрации различий между двумя объектами. Плоское сравнение
 * @param {Object} firstObj Первый объект
 * @param {Object} secondObj Второй объект
 * @returns {string}
 */
const showDiff = (firstObj, secondObj, space = ' ') => {
  const combEntries = [
    ...Object.entries(firstObj),
    ...Object.entries(secondObj),
  ];

  return `{${combEntries
    .sort(sortPairs)
    .reduce((acc, cur) => {
      const [prop, value] = cur;
      let sign = ' ';

      if (!firstObj[prop] || secondObj[prop] !== value) {
        sign = '+';
      }
      if (secondObj[prop] && firstObj[prop] !== secondObj[prop]) {
        sign = '-';
      }

      return [...acc, `\n${space}${sign} ${prop}: ${value}`];
    })
    .join('\n')}\n}`;
};

/**
 * Функция синхронного "взятия" файлов
 * @param {string} filepath1 Путь до первого файла
 * @param {string} filepath2 Путь до второго файла
 * @returns {Object[]}
 */
const getFiles = (filepath1, filepath2) => {
  return [filepath1, filepath2].map((file) => {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  });
};

// Формируем экземпляр объекта Команды
const program = new Command();
program
  .name(data.NAME)
  .version(data.VERSION)
  .description(data.DESCRIPTION)
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(showDiff(...getFiles(filepath1, filepath2)));
  });

program.parse();
