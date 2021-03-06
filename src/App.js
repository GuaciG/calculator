import React from 'react';
import Footer from './components/Footer';
import Buttons from './components/Buttons';
import Result from './components/Result';
import Header from './components/Header';
import './App.css';



let lastOperand = undefined;

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      display: 0,
      operationFlag: false,
      operationType: null,
      storedValue: null
    };

    this.numberBtnClicked = this.numberBtnClicked.bind(this);
    this.operationBtnClicked = this.operationBtnClicked.bind(this);
    this.performCalculation = this.performCalculation.bind(this);
    this.functionBtnClicked = this.functionBtnClicked.bind(this);
  }

  numberBtnClicked(value) {
    if (this.state.operationType === '=') {
      if(value !== '.') {
        this.setState({
          display: value, 
          operationType: null, 
          operationFlag: false
        });
      } 
      else {
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
          } 
          else if (value === '.' && !this.state.display.toString().includes('.')) {
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
          } 
          else if (value === '.' && !this.state.display.toString().includes('.')) {
            let stringValue = this.state.display.toString() + value.toString();
            this.setState({
              display: stringValue
            });
          } 
          else if (value === 0  && this.state.display.toString().includes('.')) {
            let stringValue = this.state.display.toString() + '0';
            this.setState({
              display: stringValue
            });
          } 
          else if (value !== '.') {
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
    if (value === '=') {
      if (lastOperand !== undefined) {
        this.setState({
          display: this.state.display,
          operationFlag: this.state.operationFlag,
          operationType: lastOperand,
          storedValue: this.state.storedValue 
        })
        lastOperand = undefined;
      }

      let result = this.performCalculation();
        this.setState({
          display: result, 
          storedValue: result, 
          operationFlag: true, 
          operationType: value
        });

    } 
    else if (!this.state.operationFlag && this.state.storedValue != null) {
      let result = this.performCalculation();
      if (result !== undefined) 
        this.setState({
          display: result, 
          storedValue: result,
          operationFlag: true, 
          operationType: value
        });

    } 
    else {
      this.setState({
        operationType: value, 
        operationFlag: true
      });
      lastOperand = undefined;
    }
  }

  
  performCalculation() {
    if (this.state.display !== undefined) {
        let secondValue = Number.parseFloat(this.state.display.toString());
        var newValue;
        switch(this.state.operationType) {
          case('+'):
              newValue = Number.parseFloat((this.state.storedValue + secondValue).toFixed(7));
              return newValue;
                
            case('-'):
              newValue = Number.parseFloat((this.state.storedValue - secondValue).toFixed(7));
              return newValue;
              
            case('X'):
              newValue = Number.parseFloat((this.state.storedValue * secondValue).toFixed(7));
              return newValue;

            case('÷'):
              newValue = Number.parseFloat((this.state.storedValue / secondValue).toFixed(7));
              return newValue;

            default:
              break;
        }
    }
  }


  functionBtnClicked(value) {
    switch(value) {
        case('AC'):
          this.setState({
            display: 0, 
            storedValue: null, 
            operationType: null, 
            operationFlag: false
          });
          break;
        case('DEL'): 
          let newVal = Number.parseFloat(this.state.display.toString().slice(0, -1));
          this.setState({
            display: newVal
          });
          if (isNaN(newVal)) this.setState({display: 0});
          break;
        case('negative'): 
          this.setState({
            display: 0 - this.state.display
          });
          break;
        default:
          break;
          
    }
  }


  render() {
    return(
      <div>
        <Header />
        <div id="calculator-grid">
            <Result display={this.state.display} />
            <Buttons 
              handleNumber={this.numberBtnClicked}
              handleOperation={this.operationBtnClicked}
              handleFunction={this.functionBtnClicked} />    
        </div>
        <Footer />
      </div>
    );
  }
  
}
  

export default App;
