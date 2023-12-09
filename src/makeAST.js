/**
 * Модуль функции, формирующей AST (Abstract Syntax Tree).
 * @module makeAST
 */

import { isAllObjects, sortPairs } from './utils.js';

/**
 * Определение типа ASTNode (узла дерева).
 * @typedef {Object} ASTNode
 * @prop {string} key Ключ узла.
 * @prop {('unchanged'|'changed'|'added'|'deleted')} [state=unchanged] Состояние узла.
 * @prop {('leaf'|'internal')} [type=leaf] Тип узла.
 * @prop {(AST|*)} value Значение узла.
 * @prop {(AST|*)} oldValue Прошлое значение узла (если значения отличаются).
 */

/**
 * Определение типа AST.
 * @typedef {Array<ASTNode>} AST
 */

/**
 * Функция, формирующая AST.
 * @param {Object} firstObj Первый объект.
 * @param {Object} secondObj Второй объект.
 * @returns {AST}
 */
const makeAST = (firstObj, secondObj) => {
  // Stack с имеющимися свойствами.
  const stack = new Set();

  /**
   * Вспомогательная рекурсивная функция.
   * @param {Object} leftObj Левый объект.
   * @param {Object} rightObj Правый объект.
   * @returns {AST}
   */
  const iter = (leftObj, rightObj) => {
    // Массив пар ключ=значение.
    const entries = [...Object.entries(leftObj), ...Object.entries(rightObj)];

    // Собираемое AST.
    const AST = entries.sort(sortPairs).reduce((acc, [prop, value]) => {
      // Если одинаковое свойство уже есть в стэке, то ничего не делаем.
      if (stack.has(prop)) {
        return [...acc];
      }

      // Определяем состояние и тип свойства.
      let state = 'unchanged';
      const type = 'leaf';

      // Меняем состояние свойства в зависимости от условий.
      switch (true) {
        case !(prop in rightObj):
          state = 'deleted';
          break;
        case !(prop in leftObj):
          state = 'added';
          break;
        case ((prop in rightObj && rightObj[prop] !== value) ||
          (prop in leftObj && leftObj[prop] !== rightObj[prop])) &&
          !isAllObjects(leftObj[prop], rightObj[prop]):
          state = 'changed';
          stack.add(prop);
          break;
        default:
          stack.add(prop);
          break;
      }

      // Если оба свойства - объекты, делаем рекурсию.
      if (isAllObjects(leftObj[prop], rightObj[prop])) {
        return [
          ...acc,
          {
            state,
            type: 'internal',
            key: prop,
            value: iter(leftObj[prop], rightObj[prop]),
          },
        ];
      }

      // Если свойство было изменено, добавляем новое и старое значения.
      return state === 'changed'
        ? [
            ...acc,
            {
              state,
              type,
              key: prop,
              value: rightObj[prop],
              oldValue: leftObj[prop],
            },
          ]
        : [...acc, { state, type, key: prop, value }];
    }, []);

    return AST;
  };

  return iter(firstObj, secondObj);
};

export default makeAST;
