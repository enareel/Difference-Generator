<p align="center">
  <img alt="+" width="150" src="https://github.com/enareel/frontend-project-46/blob/main/plus-logo.svg">
  <img alt="-" width="150" src="https://github.com/enareel/frontend-project-46/blob/main/minus-logo.svg">
</p>

<h1 align="">Вычислитель отличий</h1>
<p align="center">
  <a href="https://github.com/enareel/frontend-project-46/actions/workflows/hexlet-check.yml"><img alt="Hexlet CI" src="https://img.shields.io/github/actions/workflow/status/enareel/frontend-project-46/hexlet-check.yml?style=for-the-badge&logo=github&label=Hexlet%20CI" style="border-radius: 5px;"></a>
  <a href="https://github.com/enareel/frontend-project-46/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/enareel/frontend-project-46/ci.yml?style=for-the-badge&logo=github&label=CI" style="border-radius: 5px;"></a>
  <a href="https://codeclimate.com/github/enareel/frontend-project-46/maintainability"><img alt="Code Climate maintainability" src="https://img.shields.io/codeclimate/maintainability/enareel/frontend-project-46?style=for-the-badge&logo=codeclimate" style="border-radius: 5px;"></a>
   <a href="https://codeclimate.com/github/enareel/frontend-project-46/test_coverage"><img alt="Code Climate coverage" src="https://img.shields.io/codeclimate/coverage/enareel/frontend-project-46?style=for-the-badge&logo=codeclimate
" style="border-radius: 5px;"></a>
  <a href="https://opensource.org/licenses/MIT"><img alt="GitHub license" src="https://img.shields.io/github/license/enareel/frontend-project-lvl1?style=for-the-badge&logo=" style="border-radius: 5px;"></a>
</p>

## Навигация

- [Навигация](#навигация)
- [Используемые технологии](#используемые-технологии)
- [Описание](#описание)
  - [Игры](#игры)
  - [Пример игры](#пример-игры)
- [Установка](#установка)
- [Превью](#превью)
  - [Различия между плоскими файлами (JSON)](#различия-между-плоскими-файлами-json)
  - [Различия между плоскими файлами (YAML)](#различия-между-плоскими-файлами-yaml)
- [Структура проекта](#структура-проекта)
- [Дополнительные команды](#дополнительные-команды)
- [Лицензия](#лицензия)

## Используемые технологии

Языки программирования, библиотеки, фреймворки и т.д., используемые в проекте.

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

### Игры

- [Навигация](#навигация)
- [Используемые технологии](#используемые-технологии)
- [Описание](#описание)
  - [Игры](#игры)
  - [Пример игры](#пример-игры)
- [Установка](#установка)
- [Превью](#превью)
  - [Различия между плоскими файлами (JSON)](#различия-между-плоскими-файлами-json)
  - [Различия между плоскими файлами (YAML)](#различия-между-плоскими-файлами-yaml)
- [Структура проекта](#структура-проекта)
- [Дополнительные команды](#дополнительные-команды)
- [Лицензия](#лицензия)

Команды, с помощью которых вызываются игры:

```bash
>> brain-even
>> braic-calc
>> brain-gcd
>> brain-progression
>> brain-prime
```

### Пример игры

```bash
$ brain-progression
Welcome to the Brain Game!
What number is missing in this progression?
May I have your name? Roman
Hello, Roman!
Question: 14 .. 18 20 22 24 26 28
>> Your answer: 16 # Пользователь вводит ответ
Correct!
Question: 5 6 7 8 9 .. 11 12
>> Your answer: 10 # Пользователь вводит ответ
Correct!
Question: 12 15 18 21 .. 27 30 33
>> Your answer: 24 # Пользователь вводит ответ
Correct!
Congratulations, Roman!
```

## Установка

```
⚠️ Перед установкой проекта проверьте наличие установленных Node.js, npm!
```

Для запуска имеющихся игр необходимо предварительно установить данный проект:

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

3. Осуществите симлинк проекта:

```bash
>> make link
```

4. Запустите команду на примере тех, которые указаны [ниже](#превью).

## Превью

### Различия между плоскими файлами (JSON)

Команда для запуска: `gendiff <filepath1> <filepath2>`

[![asciicast](https://asciinema.org/a/9LwTIb4T0WSzqHXgOdiKz04wW.svg)](https://asciinema.org/a/9LwTIb4T0WSzqHXgOdiKz04wW)

### Различия между плоскими файлами (YAML)

Команда для запуска: `gendiff <filepath1> <filepath2>`

[![asciicast](https://asciinema.org/a/ETzMLr6CX6qgz2XZv97aCsjKP.svg)](https://asciinema.org/a/ETzMLr6CX6qgz2XZv97aCsjKP)

## Структура проекта

```bash
.
├── .editorconfig
├── .env
├── .eslintignore
├── .eslintrc.yml
├── .github
│   └── workflows
│       ├── README.md
│       ├── ci.yml
│       └── hexlet-check.yml
├── .gitignore
├── .npmrc
├── .prettierignore
├── .prettierrc
├── Makefile
├── README.md
├── __fixtures__
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
│   ├── stylish.test.js
│   └── utils.test.js
├── bin
│   └── gendiff.js
├── minus-logo.svg
├── package-lock.json
├── package.json
├── plus-logo.svg
└── src
    ├── formatters
    │   ├── plain.js
    │   └── stylish.js
    ├── genDiff.js
    ├── index.js
    ├── parsers.js
    └── utils.js
```

## Дополнительные команды

Полезные команды, которые доступны для использования в проекте.

<dl>
    <dt><code>make publish</code></dt>
    <dd>Публикация проекта с флагом <code>--dry-run</code></dd>
    <dt><code>make prettier</code></dt>
    <dd>Форматирование кода проекта с помощью Prettier.</dd>
    <dt><code>make lint</code></dt>
    <dd>Проверка кода проекта линтером ESLint.</dd>
    <dt><code>make test</code></dt>
    <dd>Тестирование проекта посредством Jest.</dd>
    <dt><code>make test-coverage</code></dt>
    <dd>Вывод покрытия тестами посредством Jest.</dd>
</dl>

## Лицензия

Проект имеет лицензию MIT.

Copyright (c) 2023 Nikolay Moryakin

---
