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
 * @param {Object} [firstObj={}] Первый объект.
 * @param {Object} [secondObj={}] Второй объект.
 * @returns {AST}
 */
const makeAST = (firstObj = {}, secondObj = {}) => {
  /**
   * Вспомогательная рекурсивная функция.
   * @param {Object} leftObj Левый объект.
   * @param {Object} rightObj Правый объект.
   * @returns {AST}
   */
  const iter = (leftObj, rightObj) => {
    // Stack с имеющимися свойствами.
    const stack = new Set();
    // Массив пар ключ=значение.
    const entries = [...Object.entries(leftObj), ...Object.entries(rightObj)];

    // Собираемое AST.
    const AST = entries.sort(sortPairs).reduce((acc, [prop, value]) => {
      // Если одинаковое свойство уже есть в Stack, то ничего не делаем.
      if (stack.has(prop)) {
        return [...acc];
      }

      // Определяем тип узла.
      const type = ASTNodeType.LEAF;

      // Добавляем свойство в Stack.
      stack.add(prop);

      // Если оба свойства - объекты, делаем рекурсию.
      if (isAllObjects(leftObj[prop], rightObj[prop])) {
        return [
          ...acc,
          {
            state: ASTNodeState.UNCHANGED,
            type: ASTNodeType.INTERNAL,
            key: prop,
            value: iter(leftObj[prop], rightObj[prop]),
          },
        ];
      }

      // Если свойство было изменено, добавляем новое и старое значения.
      if (
        prop in leftObj &&
        prop in rightObj &&
        leftObj[prop] !== rightObj[prop] &&
        !isAllObjects(leftObj[prop], rightObj[prop])
      ) {
        return [
          ...acc,
          {
            state: ASTNodeState.CHANGED,
            type,
            key: prop,
            value: rightObj[prop],
            oldValue: leftObj[prop],
          },
        ];
      }

      // В остальных случаях
      return [
        ...acc,
        {
          state:
            (!(prop in leftObj) && ASTNodeState.ADDED) ||
            (!(prop in rightObj) && ASTNodeState.REMOVED) ||
            ASTNodeState.UNCHANGED,
          type,
          key: prop,
          value,
        },
      ];
    }, []);

    return AST;
  };

  return iter(firstObj, secondObj);
};

export default makeAST;
