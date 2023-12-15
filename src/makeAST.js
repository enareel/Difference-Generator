/**
 * Модуль функции, формирующей AST (Abstract Syntax Tree).
 * @module makeAST
 */

import { ASTNodeType, ASTNodeState } from './constants.js';
import { sortPairs, isAllObjects } from './utils.js';

/**
 * Определение типа ASTNode (узла дерева).
 * @typedef {Object} ASTNode
 * @prop {string} key Ключ узла.
 * @prop {ASTNodeState} [state=unchanged] Состояние узла.
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
      // Если одинаковое свойство уже есть в Stack, то ничего не делаем.
      if (stack.has(prop)) {
        return [...acc];
      }

      // Определяем состояние и тип узла.
      let state = ASTNodeState.UNCHANGED;
      const type = ASTNodeType.LEAF;

      // Меняем состояние свойства в зависимости от условий.
      switch (true) {
        case !(prop in rightObj):
          state = ASTNodeState.REMOVED;
          break;
        case !(prop in leftObj):
          state = ASTNodeState.ADDED;
          break;
        case ((prop in rightObj && rightObj[prop] !== value) ||
          (prop in leftObj && leftObj[prop] !== rightObj[prop])) &&
          !isAllObjects(leftObj[prop], rightObj[prop]):
          state = ASTNodeState.CHANGED;
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
            type: ASTNodeType.INTERNAL,
            key: prop,
            value: iter(leftObj[prop], rightObj[prop]),
          },
        ];
      }

      // Если свойство было изменено, добавляем новое и старое значения.
      return state === ASTNodeState.CHANGED
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
