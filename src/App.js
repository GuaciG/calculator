import React from 'react';
import './App.css';


const initialState = {
  display: 0,
  operationFlag: false,
  operationType: null,
  storedValue: null   
};

let lastOperand = undefined;


class App extends React.Component{
  constructor() {
    super();
    this.state = initialState;
  }

  numberBtnClicked(value) {
    if (this.state.operationType === '=') {
      if(value !== '.') {
        this.setState({
          display: value, 
          operationType: null, 
          operationFlag: false
        });
      } else {
        this.setState({
          display: '0.', 
          operationType: null, 
          operationFlag: false
        });
      }
      return;
    }

    else if (!this.state.operationFlag) {
      switch(this.state.display) {
        case(0):
          if (value !== '.') {
            this.setState({
              display: value
            });

          } else if (value === '.' && !this.state.display.toString().includes('.')) {
            this.setState({
              display: '0.'
            });
          }
          break; 

        default:
          if (value !== '.' && !this.state.display.toString().includes('.')) {
            let stringValue = this.state.display.toString() + value.toString();
            let newValue = Number.parseFloat(stringValue);
            this.setState({
              display: newValue
            });

          } else if (value === '.' && !this.state.display.toString().includes('.')) {
            let stringValue = this.state.display.toString() + value.toString();
            this.setState({
              display: stringValue
            });
          } else if (value === 0  && this.state.display.toString().includes('.')) {
            let stringValue = this.state.display.toString() + '0';
            this.setState({
              display: stringValue
            });
          } else if (value !== '.') {
            let stringValue = this.state.display.toString() + value.toString();
            let newValue = Number.parseFloat(stringValue);
            this.setState({
              display: newValue
            });
          }
          break;
      }

    } else {
      switch(value) {
        case('.'):
          break;
          
        default:
          let storedValue = Number.parseFloat(this.state.display.toString());
          this.setState({
            storedValue: storedValue, 
            operationFlag: false, 
            display: value
          });
          break;
      }
    }
  }

  operationBtnClicked(value) {
    if (value === '-' && this.state.operationFlag === true) {
      lastOperand = this.state.operationType;

    } else if (value === '=') {
      if (lastOperand !== undefined) {
        this.setState({
          display: 0 - this.state.display,
          operationFlag: this.state.operationFlag,
          operationType: lastOperand,
          storedValue: this.state.storedValue
        })
        lastOperand = undefined;
      }

      let result = this.compute();
        this.setState({
          display: result, 
          storedValue: result, 
          operationFlag: true, 
          operationType: value
        });

      } else if (!this.state.operationFlag && this.state.storedValue != null) {
          let result = this.compute();
          if (result !== undefined) {
            this.setState({
              display: result, 
              storedValue: result
            });
          } else { 
            this.setState({
              operationFlag: true, 
              operationType: value
            })
          }

      } else {
          this.setState({
            operationType: value, 
            operationFlag: true
          });
          lastOperand = undefined;
      }
  }

  compute() {
    if (this.state.display !== undefined) {
      let secondValue = Number.parseFloat(this.state.display.toString());
      let newValue;
      if(this.state.operationType === '+') {
        newValue = Number.parseFloat((this.state.storedValue + secondValue).toFixed(7));
          return newValue;
      }
      else if (this.state.operationType === '-') {
        newValue = Number.parseFloat((this.state.storedValue - secondValue).toFixed(7));
          return newValue;
      }
      else if (this.state.operationType === 'x') {
        newValue = Number.parseFloat((this.state.storedValue * secondValue).toFixed(7));
          return newValue;
      }
      else if (this.state.operationType === '÷') {
        newValue = Number.parseFloat((this.state.storedValue / secondValue).toFixed(7));
          return newValue;
      }
      
    }
  } 

  actionBtnClicked(value) {
    if (value === 'AC') {
      this.setState({
        display: 0, 
        storedValue: null, 
        operationType: null, 
        operationFlag: false
      });
    }
    else if (value === 'DEL') {
      let newVal = Number.parseFloat(this.state.display.toString().slice(0, -1));
      this.setState({
        display: newVal
      });
        if (isNaN(newVal)) {
          this.setState({
            display: 0
          });
        }
    }
    
    else if (value === 'negative') {
      if (this.state.display !== 0) {
        this.setState({
          display: 0 - this.state.display
        });
      }
    }
  } 
    

  render() {
    return(
      <div id="appWrapper">
        <h1>JavaScript Calculator</h1>
        <div id="calculator-grid">
          <div id="displayWrapper">
            <p id="display" className="main-result">{this.state.display}</p>
          </div>
          <div id="inputWrapper">
            <button id="clear" className="all-clear" onClick={() => {this.actionBtnClicked('AC')}}>AC</button>
            <button id="delete" className="delete" onClick={() => {this.actionBtnClicked('DEL')}}>DEL</button>
            <button id="negative" className="negative" onClick={() => {this.actionBtnClicked('negative')}}>&plusmn;</button>
            <button id="divide" 
                      className={"operator" + ((this.state.operationType === '÷' && this.state.operationFlag) ? " active" : "")}                         onClick={() => {this.operationBtnClicked('÷')}}>÷</button>
            <button id="seven" className="number" onClick={() => {this.numberBtnClicked(7)}}>7</button>
            <button id="eight" className="number" onClick={() => {this.numberBtnClicked(8)}}>8</button>
            <button id="nine" className="number" onClick={() => {this.numberBtnClicked(9)}}>9</button>
            <button id="multiply" 
                      className={"operator" + ((this.state.operationType === 'x' && this.state.operationFlag) ? " active" : "")}                         onClick={()=>{this.operationBtnClicked('x')}}>x</button>
            <button id="four" className="number" onClick={() => {this.numberBtnClicked(4)}}>4</button>
            <button id="five" className="number" onClick={() => {this.numberBtnClicked(5)}}>5</button>
            <button id="six" className="number" onClick={() => {this.numberBtnClicked(6)}}>6</button>
            <button id="subtract" 
                      className={"operator" + ((this.state.operationType === '-' && this.state.operationFlag) ? " active" : "")}                         onClick={()=>{this.operationBtnClicked('-')}}>-</button>
            <button id="one" className="number" onClick={() => {this.numberBtnClicked(1)}}>1</button>
            <button id="two" className="number" onClick={() => {this.numberBtnClicked(2)}}>2</button>
            <button id="three" className="number" onClick={() => {this.numberBtnClicked(3)}}>3</button>
            <button id="add" 
                      className={"operator" + ((this.state.operationType === '+' && this.state.operationFlag) ? " active" : "")}                         onClick={()=>{this.operationBtnClicked('+')}}>+</button>
            <button id="zero" className="span-two number corner4" onClick={() => {this.numberBtnClicked(0)}}>0</button>
            <button id="decimal" className="decimal number" onClick={() => {this.numberBtnClicked('.')}}>.</button>
            <button id="equals" className="operator corner3" onClick={()=>{this.operationBtnClicked('=')}}>=</button>
          </div>
        </div>
        <footer> 2020 Made by <a href="https://codepen.io/GuaciG" target="_blank" rel="noreferrer"> GuaciG</a>
        </footer>
      </div>
    );
  }
}
  

export default App;
