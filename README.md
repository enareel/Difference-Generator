### Hexlet tests and linter status:

[![Actions Status](https://github.com/enareel/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/enareel/frontend-project-46/actions)

# Вычислитель отличий &middot; [![Actions Status](https://github.com/enareel/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/enareel/frontend-project-46/actions)

[Описание](#описание "Описание") | [Установка](#установка "Установка") | [Превью](#превью "Превью")

## Описание

**«Вычислитель отличий»** — программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например [JSON Diff](http://www.jsondiff.com/ "JSON Diff"). Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

Возможности утилиты:

Поддержка разных входных форматов: yaml, json
Генерация отчета в виде plain text, stylish и json

- [x] Hechk
1. test
   1. Test
- [Различия между плоскими файлами](#различия-между-плоскими-файлами). Команда возвращает различия между плоскими  файлами
- [Прогрессия](#прогрессия). Поиск пропущенных чисел в последовательности чисел.
- [Определение четного числа](#определение-четного-числа).
- [Определение наибольшего общего делителя](#определение-наибольшего-общего-делителя).
- [Определение простого числа](#определение-простого-числа).

Пример игры:

```$ brain-progression
Welcome to the Brain Game!
What number is missing in this progression?
May I have your name? Roman
Hello, Roman!
Question: 14 .. 18 20 22 24 26 28
Your answer: 16 # Пользователь вводит ответ
Correct!
Question: 5 6 7 8 9 .. 11 12
Your answer: 10 # Пользователь вводит ответ
Correct!
Question: 12 15 18 21 .. 27 30 33
Your answer: 24 # Пользователь вводит ответ
Correct!
Congratulations, Roman!
```

## Установка

Для запуска имеющихся игр необходимо предварительно установить данный проект:

1. Склонируйте репозиторий, например, посредством следующей консольной команды:

```
git clone https://github.com/enareel/frontend-project-46.git
```

2. Осуществите установку проекта:

```
make install
```

3. Осуществите симлинк проекта:

```
make link
```

4. Запустите любую из игр посредством комманд, указанные [ниже](#превью).

## Превью

### Различия между плоскими файлами

Команда для запуска: `gendiff <filepath1> <filepath2>`

[![asciicast](https://asciinema.org/a/kwIcakbm7YakpMBz1xKVqkQhY.svg)](https://asciinema.org/a/kwIcakbm7YakpMBz1xKVqkQhY)
