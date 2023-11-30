/**
 * Модуль тестирования функции форматтера stylish.
 * @module stylish.test
 */

import stylish from '../src/formatters/stylish.js';

// Данные.
const data = [
  {
    name: 'Проверка форматирования плоских деревьев',
    data: [
      {
        name: 'Дерево 1. Пустое',
        tree: {},
        expected: `{
          
        }`
      },
      {
        name: 'Дерево 2',
        value:{
          follow: {
            state: 'deleted',
            type: 'leaf',
            value: false,
          },
          host: {
            state: 'unchanged',
            type: 'leaf',
            value: 'hexlet.io',
          },
          proxy: {
            state: 'deleted',
            type: 'leaf',
            value: '123.234.53.22',
          },
          timeout: {
            state: 'changed',
            type: 'leaf',
            newValue: 20,
            oldValue: 50,
          },
          verbose: {
            state: 'added',
            type: 'leaf',
            value: true,
          },
        },
        options: [{}, {
          replacer: '',
    spacesCount: 10,
        }],
        expected:[
          `{
            - follow: false
              host: hexlet.io
            - proxy: 123.234.53.22
            - timeout: 50
            + timeout: 20
            + verbose: true
          }`,`{
            ********- follow: false
            *******   host: hexlet.io
            ********- proxy: 123.234.53.22
            ********- timeout: 50
            ********+ timeout: 20
            ********+ verbose: true
            }`
        ]
      }, 
    ]
  }
];

// Формат stylish
describe('Формат stylish.', () => {
  test.each(data)('$name', ({ tree, replacer, spacesCount, expected }) => {
    const result = stylish(tree, replacer, spacesCount);

    expect(result).toEqual(expected);
  });
});
