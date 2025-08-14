import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentOperand, setCurrentOperand] = useState('0');
  const [previousOperand, setPreviousOperand] = useState('');
  const [operation, setOperation] = useState(null);
  const [resetOnNextInput, setResetOnNextInput] = useState(false);

  const formatNumber = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleNumber = (number) => {
    if (currentOperand === '0' || resetOnNextInput) {
      setCurrentOperand(number);
      setResetOnNextInput(false);
    } else {
      setCurrentOperand(currentOperand + number);
    }
  };

  const handleDecimal = () => {
    if (resetOnNextInput) {
      setCurrentOperand('0.');
      setResetOnNextInput(false);
      return;
    }
    
    if (!currentOperand.includes('.')) {
      setCurrentOperand(currentOperand + '.');
    }
  };

  const handleOperation = (op) => {
    if (currentOperand === '') return;
    
    if (previousOperand !== '') {
      calculateResult();
    }
    
    setOperation(op);
    setPreviousOperand(currentOperand);
    setResetOnNextInput(true);
  };

  const calculateResult = () => {
    if (!operation ||  previousOperand === '' || currentOperand === '') return;
    
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    let result;
    
    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      default:
        return;
    }
    
    setCurrentOperand(result.toString());
    setPreviousOperand('');
    setOperation(null);
    setResetOnNextInput(true);
  };

  const clearAll = () => {
    setCurrentOperand('0');
    setPreviousOperand('');
    setOperation(null);
  };

  const handleDelete = () => {
    if (currentOperand.length === 1 || 
        (currentOperand.length === 2 && currentOperand.startsWith('-'))) {
      setCurrentOperand('0');
    } else {
      setCurrentOperand(currentOperand.slice(0, -1));
    }
  };

  const handleEquals = () => {
    if (previousOperand === '' || operation === null) return;
    calculateResult();
    setOperation(null);
    setPreviousOperand('');
  };

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{formatNumber(currentOperand)}</div>
      </div>
      <button className="span-two" onClick={clearAll}>AC</button>
      <button onClick={handleDelete}>DEL</button>
      <button onClick={() => handleOperation('/')}>/</button>
      <button onClick={() => handleNumber('1')}>1</button>
      <button onClick={() => handleNumber('2')}>2</button>
      <button onClick={() => handleNumber('3')}>3</button>
      <button onClick={() => handleOperation('*')}>*</button>
      <button onClick={() => handleNumber('4')}>4</button>
      <button onClick={() => handleNumber('5')}>5</button>
      <button onClick={() => handleNumber('6')}>6</button>
      <button onClick={() => handleOperation('+')}>+</button>
      <button onClick={() => handleNumber('7')}>7</button>
      <button onClick={() => handleNumber('8')}>8</button>
      <button onClick={() => handleNumber('9')}>9</button>
      <button onClick={() => handleOperation('-')}>-</button>
      <button onClick={handleDecimal}>.</button>
      <button onClick={() => handleNumber('0')}>0</button>
      <button className="span-two" onClick={handleEquals}>=</button>
    </div>
  );
}

export default App;