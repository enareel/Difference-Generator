/**
 * Модуль тестирования функции genDiff.
 * @module genDiff.test
 */

import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import getFiles from '../src/parsers.js';
import genDiff from '../src/genDiff.js';

// Вспомогательные данные.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Функция создания корректного пути до файла.
 * @param {string} filepath Путь до файла (абс. или относ.).
 * @returns {string}
 */
const makeCorrectPath = (filepath) =>
  path.join(__dirname, '..', '__fixtures__', filepath);

// Данные для сравнения.
const data = [
  {
    name: 'Проверка плоских файлов JSON',
    data: [
      {
        file1: 'file1.json',
        file2: 'file2.json',
        expected: [
          {
            format: 'stylish',
            value: `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
          },
          {
            format: 'plain',
            value: `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`,
          },
        ],
      },
      {
        file1: 'file1.json',
        file2: 'file3.json',
        expected: [
          {
            format: 'stylish',
            value: `{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`,
          },
          {
            format: 'plain',
            value: `Property 'follow' was removed
Property 'host' was removed
Property 'proxy' was removed
Property 'timeout' was removed`,
          },
        ],
      },
    ],
  },
  {
    name: 'Проверка рекурсивных файлов JSON',
    data: [
      {
        file1: 'file5.json',
        file2: 'file6.json',
        expected: [
          {
            format: 'stylish',
            value: `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`,
          },
          {
            format: 'plain',
            value: `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`,
          },
        ],
      },
    ],
  },
  {
    name: 'Проверка плоских файлов YAML',
    data: [
      {
        file1: 'file1.yaml',
        file2: 'file2.yml',
        expected: [
          {
            format: 'stylish',
            value: `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
          },
          {
            format: 'plain',
            value: `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`,
          },
        ],
      },
      {
        file1: 'file1.yaml',
        file2: 'file3.yaml',
        expected: [
          {
            format: 'stylish',
            value: `{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`,
          },
          {
            format: 'plain',
            value: `Property 'follow' was removed
Property 'host' was removed
Property 'proxy' was removed
Property 'timeout' was removed`,
          },
        ],
      },
    ],
  },
  {
    name: 'Проверка рекурсивных файлов YAML',
    data: [
      {
        file1: 'file5.yaml',
        file2: 'file6.yaml',
        expected: [
          {
            format: 'stylish',
            value: `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`,
          },
          {
            format: 'plain',
            value: `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`,
          },
        ],
      },
    ],
  },
];

// Формат stylish.
describe.each(data)('$name.', ({ data }) => {
  test.each(data)('Проверка $file1 и $file2.', ({ file1, file2, expected }) => {
    const f1 = getFiles(makeCorrectPath(file1));
    const f2 = getFiles(makeCorrectPath(file2));

    // Проверяем правильность форматирования для каждого типа.
    expected.forEach(({ format, value }) => {
      const result = genDiff(f1, f2, format);

      expect(result).toEqual(value);
    });
  });
});
