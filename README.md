<p align="center">
  <img alt="+" width="150" src="https://github.com/enareel/frontend-project-46/blob/main/plus-logo.svg">
  <img alt="-" width="150" src="https://github.com/enareel/frontend-project-46/blob/main/minus-logo.svg">
</p>

<h1 align="">Вычислитель отличий</h1>
<p align="center">
  <a href="https://github.com/enareel/frontend-project-46/actions/workflows/hexlet-check.yml"><img alt="Hexlet CI" src="https://img.shields.io/github/actions/workflow/status/enareel/frontend-project-46/hexlet-check.yml?style=for-the-badge&logo=github&label=Hexlet%20CI" style="border-radius: 5px;"></a>
  <a href="https://github.com/enareel/frontend-project-46/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/enareel/frontend-project-46/ci.yml?style=for-the-badge&logo=github&label=CI" style="border-radius: 5px;"></a>
  <a href="https://codeclimate.com/github/enareel/frontend-project-46/maintainability"><img alt="Code Climate maintainability" src="https://img.shields.io/codeclimate/maintainability/enareel/frontend-project-46?style=for-the-badge&logo=codeclimate" style="border-radius: 5px;"></a>
   <a href="https://codeclimate.com/github/enareel/frontend-project-46/test_coverage"><img alt="Code Climate coverage" src="https://img.shields.io/codeclimate/coverage/enareel/frontend-project-46?style=for-the-badge&logo=codeclimate" style="border-radius: 5px;"></a>
  <a href="https://github.com/enareel/frontend-project-46/blob/main/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/enareel/frontend-project-46?style=for-the-badge
" style="border-radius: 5px;"></a>
</p>

## Навигация

- [Навигация](#навигация)
- [Используемые технологии](#используемые-технологии)
- [Описание](#описание)
  - [Особенности](#особенности)
- [Установка](#установка)
- [Использование](#использование)
  - [Библиотека](#библиотека)
  - [CLI команда](#cli-команда)
    - [Формат stylish](#формат-stylish)
      - [Пример](#пример)
      - [Различия между плоскими файлами (JSON)](#различия-между-плоскими-файлами-json)
      - [Различия между плоскими файлами (YAML)](#различия-между-плоскими-файлами-yaml)
      - [Различия между вложенными файлами (JSON)](#различия-между-вложенными-файлами-json)
      - [Различия между вложенными файлами (YAML)](#различия-между-вложенными-файлами-yaml)
    - [Формат plain](#формат-plain)
      - [Пример](#пример-1)
      - [Различия между плоскими файлами (JSON)](#различия-между-плоскими-файлами-json-1)
      - [Различия между плоскими файлами (YAML)](#различия-между-плоскими-файлами-yaml-1)
      - [Различия между вложенными файлами (JSON)](#различия-между-вложенными-файлами-json-1)
      - [Различия между вложенными файлами (YAML)](#различия-между-вложенными-файлами-yaml-1)
    - [Формат json](#формат-json)
      - [Пример](#пример-2)
      - [Различия между плоскими файлами (JSON)](#различия-между-плоскими-файлами-json-2)
      - [Различия между плоскими файлами (YAML)](#различия-между-плоскими-файлами-yaml-2)
      - [Различия между вложенными файлами (JSON)](#различия-между-вложенными-файлами-json-2)
      - [Различия между вложенными файлами (YAML)](#различия-между-вложенными-файлами-yaml-2)
- [Структура проекта](#структура-проекта)
- [Дополнительные команды](#дополнительные-команды)
- [Лицензия](#лицензия)

## Используемые технологии

Языки программирования, библиотеки, фреймворки и т.д., используемые в проекте:

<p align="center">
  <a href="https://github.com/topics/javascript"><img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" style="border-radius: 5px;"></a>
  <a href="https://github.com/nodejs"><img alt="Node.js" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" style="border-radius: 5px;"></a>
  <a href="https://github.com/tj/commander.js"><img alt="Commander.js" src="https://img.shields.io/badge/Commander.js-181818?style=for-the-badge&logo=slashdot&logoColor=white" style="border-radius: 5px;"></a>
  <a href="https://github.com/jestjs/jest"><img alt="Jest" src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white" style="border-radius: 5px;"></a>
  <a href="https://github.com/eslint/eslint"><img alt="ESLint" src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" style="border-radius: 5px;"></a>
  <a href="https://github.com/prettier/prettier"><img alt="Prettier" src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" style="border-radius: 5px;"></a>
  <a href="https://docs.github.com/ru/actions"><img alt="GitHub Actions" src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" style="border-radius: 5px;"></a>
</p>

## Описание

> Проект **«Вычислитель отличий»** создан в рамках профессии **«Фронтенд-разработчик»** на платформе [Hexlet.io](https://ru.hexlet.io).

**«Вычислитель отличий»** — программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например [JSON Diff](http://www.jsondiff.com/ 'JSON Diff'). Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

В рамках данного проекта реализовано создание **AST** (_англ._ Abstract Syntax Tree) - абстрактного синтаксического дерева, на основании которого имеющиеся форматеры (<code>stylish</code>, <code>plain</code>, <code>json</code>) выводят различия как **плоских**, так и **вложенных** файлов (используется _рекурсия_).

### Особенности

- [x] Доступны следующие форматы для чтения: <code>JSON</code>, <code>YAML</code>.
- [x] Реализованы следующие форматеры: <code>stylish</code> (по умолчанию), <code>plain</code>, <code>json</code>.
- [x] Возможность использовать как _библиотеку_, так и как <code>CLI</code> команду.

## Установка

```
⚠️ Перед установкой проекта проверьте наличие установленных Node.js, npm!
```

Для работы с проектом необходимо выполнить следующие действия по его установке:

1. Склонируйте репозиторий, используя одну из следующих консольных команд:

```bash
# HTTPS
>> git clone https://github.com/enareel/frontend-project-46.git
# SSH
>> git clone git@github.com:enareel/frontend-project-46.git
```

2. Осуществите установку проекта:

```bash
>> make install
```

3. Осуществите symlink проекта:

```bash
>> make link
```

4. Запустите команду на примере тех, которые указаны [ниже](#использование).

## Использование

### Библиотека

Данный проект можно использовать как _библиотеку_ в любом проекте. Достаточно выполнить следующий код:

```javascript
import genDiff from 'gendiff';

const diff = genDiff(file1, file2, formatter);
```

Здесь <code>file1</code> и <code>file2</code> — названия (или _абсолютные_ пути) файлов, разницу которых мы хотим вывести; <code>formatter</code> — название форматера (_stylish_, _plain_, _json_).

### CLI команда

Данный проект можно использовать как утилиту _командной строки_. Подробности использования описания в **helper**:

```bash
>> gendiff -h
```

```bash
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```

#### Формат <code>stylish</code>

Данный форматер выводит разницу между двумя файлами, учитывая следующие особенности:

- Если свойство было **добавлено** и **удалено** либо **изменило** свое значение, то указываются знаки <code>+</code> и <code>-</code> соответственно.
- В остальных случаях свойство либо **не изменилось**, либо в **обоих файлах** имеет в качестве значения _объект_ (является **вложенным**).

##### Пример

```bash
>> gendiff file1.json file2.json
```

```bash
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

##### Различия между плоскими файлами (JSON)

[![asciicast](https://asciinema.org/a/7Y1cZKigFf8AUNnZRKJfNSuWY.svg)](https://asciinema.org/a/7Y1cZKigFf8AUNnZRKJfNSuWY)

##### Различия между плоскими файлами (YAML)

[![asciicast](https://asciinema.org/a/BzYKl49kATIPX5FoPow3jAaDJ.svg)](https://asciinema.org/a/BzYKl49kATIPX5FoPow3jAaDJ)

##### Различия между вложенными файлами (JSON)

[![asciicast](https://asciinema.org/a/KmzhPRr71M2FW4BzjuCssPtEW.svg)](https://asciinema.org/a/KmzhPRr71M2FW4BzjuCssPtEW)

##### Различия между вложенными файлами (YAML)

[![asciicast](https://asciinema.org/a/JWjq0CXnC2oUhxUm6NK0bUUpn.svg)](https://asciinema.org/a/JWjq0CXnC2oUhxUm6NK0bUUpn)

#### Формат <code>plain</code>

Данный форматер выводит разницу между двумя файлами, учитывая следующие особенности:

- Если свойство имеет _"сложное значение"_ (_объект_, _массив_), то выводится <code>[complex value]</code>.
- Если свойство является _вложенным_, то оно **не учитывается**: сохраняется лишь путь до него, который используется при выводе остальных _"плоских"_ свойств, находящийся внутри оного.
- Если свойство **не было** изменено, то оно **не выводится**.

##### Пример

```bash
>> gendiff file5.json file6.json -f plain
```

```bash
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

##### Различия между плоскими файлами (JSON)

[![asciicast](https://asciinema.org/a/B0EfKCZvHwSq8lbMOaSsTA8oU.svg)](https://asciinema.org/a/B0EfKCZvHwSq8lbMOaSsTA8oU)

##### Различия между плоскими файлами (YAML)

[![asciicast](https://asciinema.org/a/yO0GDRwcDu0QrKnuILBluOo8d.svg)](https://asciinema.org/a/yO0GDRwcDu0QrKnuILBluOo8d)

##### Различия между вложенными файлами (JSON)

[![asciicast](https://asciinema.org/a/3Gbeiu5HRZxqESLFt2VpSMuAP.svg)](https://asciinema.org/a/3Gbeiu5HRZxqESLFt2VpSMuAP)

##### Различия между вложенными файлами (YAML)

[![asciicast](https://asciinema.org/a/GJs9HIXc3JYhPyy28TE6hOaan.svg)](https://asciinema.org/a/GJs9HIXc3JYhPyy28TE6hOaan)

#### Формат <code>json</code>

Данный форматер выводит разницу между двумя файлами, учитывая следующие особенности:

- Если свойство не является _вложенным_ или _"сложным"_ то указывается его **имя** и **дескриптор** в формате: <code>{ state: 'СОСТОЯНИЕ', type: 'ТИП', value: 'ЗНАЧЕНИЕ' }</code>.
- Если свойство является _вложенным_, то оно **не учитывается**: сохраняется лишь путь до него, который используется при выводе остальных _"плоских"_ свойств, находящийся внутри оного.
- Если свойство **не было** изменено, то оно **не выводится**.

Состояния:

- <code>added</code>: свойство отсутствует в _первом_ файле и присутствует во _втором_.
- <code>deleted</code>: свойство присутствует в _первом_ файле и отсутствует во _втором_.
- <code>changed</code>: свойство имеет разные значения в _обоих_ файлах (**не является** _вложенным_).
- <code>unchanged</code>: свойство имеет одинаковые значения в _обоих_ файлах или **является** _вложенным_.

Типы:

- <code>leaf</code>: свойство **не является** _вложенным_.
- <code>internal</code>: свойство **является** _вложенным_.

##### Пример

```bash
>> gendiff file1.yaml file3.yaml -f json
```

```bash
{
   "follow": {
       "state": "deleted",
       "type": "leaf",
       "value": false
    },
   "host": {
       "state": "deleted",
       "type": "leaf",
       "value": "hexlet.io"
    },
   "proxy": {
       "state": "deleted",
       "type": "leaf",
       "value": "123.234.53.22"
    },
   "timeout": {
       "state": "deleted",
       "type": "leaf",
       "value": 50
    }
}
```

##### Различия между плоскими файлами (JSON)

[![asciicast](https://asciinema.org/a/XvDYan3AEbfkAA4AjjE26kaSv.svg)](https://asciinema.org/a/XvDYan3AEbfkAA4AjjE26kaSv)

##### Различия между плоскими файлами (YAML)

[![asciicast](https://asciinema.org/a/0SbDpZYQiRnwVb6jShxrbesSQ.svg)](https://asciinema.org/a/0SbDpZYQiRnwVb6jShxrbesSQ)

##### Различия между вложенными файлами (JSON)

[![asciicast](https://asciinema.org/a/FnaFJ0RnEsizYTRMs92QksG8m.svg)](https://asciinema.org/a/FnaFJ0RnEsizYTRMs92QksG8m)

##### Различия между вложенными файлами (YAML)

[![asciicast](https://asciinema.org/a/apnQ9YCRPnTri9ODGrGHPT0fF.svg)](https://asciinema.org/a/apnQ9YCRPnTri9ODGrGHPT0fF)

## Структура проекта

```bash
.
├── LICENSE
├── Makefile
├── README.md
├── __fixtures__
│   ├── correctPlain1.txt
│   ├── correctPlain2.txt
│   ├── correctPlain3.txt
│   ├── correctStylish1.txt
│   ├── correctStylish2.txt
│   ├── correctStylish3.txt
│   ├── file1.html
│   ├── file1.json
│   ├── file1.yaml
│   ├── file2.json
│   ├── file2.yml
│   ├── file3.json
│   ├── file3.yaml
│   ├── file4.json
│   ├── file4.yml
│   ├── file5.json
│   ├── file5.yaml
│   ├── file6.json
│   └── file6.yaml
├── __tests__
│   ├── genDiff.test.js
│   ├── parses.test.js
│   └── utils.test.js
├── bin
│   └── gendiff.js
├── jest.config.js
├── minus-logo.svg
├── package-lock.json
├── package.json
├── plus-logo.svg
└── src
    ├── constants.js
    ├── formatters
    │   ├── index.js
    │   ├── json.js
    │   ├── plain.js
    │   └── stylish.js
    ├── genDiff.js
    ├── index.js
    ├── makeAST.js
    ├── parsers.js
    └── utils.js
```

## Дополнительные команды

Полезные команды, которые доступны для использования в проекте.

<dl>
<dt><code>make install</code></dt>
    <dd>Установка зависимостей <code>CI</code>проекта.</dd>
    <dt><code>make link</code></dt>
    <dd>Линк проекта.</dd>
    <dt><code>make publish</code></dt>
    <dd>Публикация проекта с флагом <code>--dry-run</code></dd>
    <dt><code>make prettier</code></dt>
    <dd>Форматирование кода проекта с помощью<code>prettier</code>.</dd>
    <dt><code>make lint</code></dt>
    <dd>Проверка кода проекта с помощью линтера <code>ESLint</code>.</dd>
    <dt><code>make test</code></dt>
    <dd>Тестирование проекта посредством <code>Jest</code>.</dd>
    <dt><code>make test-coverage</code></dt>
    <dd>Вывод покрытия тестами проекта посредством <code>Jest</code>.</dd>
</dl>

## Лицензия

Проект имеет лицензию MIT.

Copyright (c) 2023 Nikolay Moryakin

---
