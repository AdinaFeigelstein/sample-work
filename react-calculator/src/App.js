/* eslint-disable no-undef */
import './App.css';
import React, { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") return state;  //can't enter more zeros if there is just a plain zero
      if (payload.digit === "." && state.currentOperand.includes(".")) return state; //can't enter multiple decimals
      return {
        ...state,
        // eslint-disable-next-line no-undef
        currentOperand: `${state.currentOperand || ""}${payload.digit}`  //adds new digit to the current operand and sets that as state
      }

    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {  //if never pressed anything yet, operators should do nothing
        return state
      }

      if (state.currentOperand == null) {  //if hit the wrong operation and hit the correct new one, update the operation
        return {
          ...state,
          operation: payload.operation
        }
      }
      if (state.previousOperand == null) {  //first operand - set it as the previous and make current null
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      return {     //lastly, if chain multiple operators, set the solution of the previous 2 operands as the previous, ad=nd current to null
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.EVALUATE:
      if (state.operation == null || state.previousOperand == null || state.currentOperand == null) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
      }
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: null,
          overwrite: false
        }
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    default:
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(previous) || isNaN(current)) return "";
  let result = "";
  switch (operation) {
    case "+":
      result = previous + current
      break
    case "-":
      result = previous - current
      break
    case "*":
      result = previous * current
      break
    case "÷":
      result = previous / current
      break
    default:
  }
  return result.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0
})

function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

export default function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <>
      <div className='calculator-grid'>
        <div className='calculator-container'>
          <div className='result'>
            <div className='previous-operand'>{formatOperand(previousOperand)} {operation} </div>
            <div className='current-operand'>{formatOperand(currentOperand)}</div>
          </div>

          <button className='span-two' onClick={() => dispatch({ type: ACTIONS.CLEAR })}>Clear</button>
          <button className='span-two' onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>Del</button>

          <DigitButton digit="1" dispatch={dispatch} />
          <DigitButton digit="2" dispatch={dispatch} />
          <DigitButton digit="3" dispatch={dispatch} />
          <OperationButton operation="÷" dispatch={dispatch} />
          <DigitButton digit="4" dispatch={dispatch} />
          <DigitButton digit="5" dispatch={dispatch} />
          <DigitButton digit="6" dispatch={dispatch} />
          <OperationButton operation="*" dispatch={dispatch} />
          <DigitButton digit="7" dispatch={dispatch} />
          <DigitButton digit="8" dispatch={dispatch} />
          <DigitButton digit="9" dispatch={dispatch} />
          <OperationButton operation="+" dispatch={dispatch} />
          <DigitButton digit="." dispatch={dispatch} />
          <DigitButton digit="0" dispatch={dispatch} />
          <button onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
          <OperationButton operation="-" dispatch={dispatch} />
        </div>
      </div>



    </>
  )
}
