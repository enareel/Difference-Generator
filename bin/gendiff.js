#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'node:fs';
import path from 'node:path';

// Вспомогательные переменные
const data = {
  NAME: 'gendiff',
  VERSION: '0.0.1',
  DESCRIPTION: 'Compares two configuration files and shows a difference.',
  SRC_DIR: 'src',
};

/**
 * Функция сортировки пар массива.
 * @param {Array} a Пара (массив из двух элементов).
 * @param {Array} b Пара (массив из двух элементов).
 * @returns {number}
 */
const sortPairs = (a, b) => {
  if (a[0] === b[0]) {
    return 0;
  }
  return a[0] > b[0] ? 1 : -1;
};

/**
 * Функция определения корректного (абс. или отн.) пути файлов.
 * @param {string[]} paths Массив путей.
 * @returns {string[]}
 */
const makeCorrectPath = (paths) => {
  return paths.map((item) => path.resolve(data.SRC_DIR, item));
};

/**
 * Функция синхронного "взятия" файлов.
 * @param {string[]} filepaths Массив путей до файлов.
 * @returns {Object[]}
 */
const getFiles = (filepaths) => {
  return filepaths.map((file) => {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  });
};

/**
 * Функция демонстрации различий между двумя объектами. Плоское сравнение
 * @param {Object} firstObj Первый объект
 * @param {Object} secondObj Второй объект
 * @returns {string}
 */
const showDiff = ([firstObj, secondObj], space = ' ') => {
  const combEntries = [
    ...Object.entries(firstObj),
    ...Object.entries(secondObj),
  ];

  // Формируем (рекурсивно) объект записей.
  const combObj = combEntries.sort(sortPairs).reduce((acc, cur) => {
    const [prop, value] = cur;
    let sign = '  ';

    // Устанавливаем знак.
    if (!secondObj[prop] || (secondObj[prop] && secondObj[prop] !== value)) {
      sign = '- ';
    } else if (
      !firstObj[prop] ||
      (firstObj[prop] && firstObj[prop] !== secondObj[prop])
    ) {
      sign = '+ ';
    }

    // Проверяем наличие в аккумуляторе
    return { ...acc, [`${space.repeat(2)}${sign}${prop}`]: value };
  }, []);

  return `{\n${Object.entries(combObj)
    .map((pair) => pair.join(' '))
    .join(',\n')}\n}`;
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
    console.log(showDiff(getFiles(makeCorrectPath([filepath1, filepath2]))));
  });

program.parse();
