import React from 'react';
import './Buttons.css';



class Buttons extends React.Component {
    render () {
        return (
            <div id="inputWrapper">
                <button id="clear" className="all-clear" onClick={() => {this.props.handleFunction('CLR')}}>AC</button>
                <button id="delete" className="delete" onClick={() => {this.props.handleFunction('DEL')}}>DEL</button>
                <button id="negative" className="negative" onClick={() => {this.props.handleFunction('negative')}}>&plusmn;</button>
                <button id="divide" className={"operator" + ((this.operationType === '÷' && this.operationFlag) ? " active" : "")} onClick={() => {this.props.handleOperation('÷')}}>÷</button>
                <button id="seven" className="number" onClick={() => {this.props.handleNumber(7)}}>7</button>
                <button id="eight" className="number" onClick={() => {this.props.handleNumber(8)}}>8</button>
                <button id="nine" className="number" onClick={() => {this.props.handleNumber(9)}}>9</button>
                <button id="multiply" className={"operator" + ((this.operationType === 'X' && this.operationFlag) ? " active" : "")} onClick={()=>{this.props.handleOperation('X')}}>x</button>
                <button id="four" className="number" onClick={() => {this.props.handleNumber(4)}}>4</button>
                <button id="five" className="number" onClick={() => {this.props.handleNumber(5)}}>5</button>
                <button id="six" className="number" onClick={() => {this.props.handleNumber(6)}}>6</button>
                <button id="subtract" className={"operator" + ((this.operationType === '-' && this.operationFlag) ? " active" : "")} onClick={()=>{this.props.handleOperation('-')}}>-</button>
                <button id="one" className="number" onClick={() => {this.props.handleNumber(1)}}>1</button>
                <button id="two" className="number" onClick={() => {this.props.handleNumber(2)}}>2</button>
                <button id="three" className="number" onClick={() => {this.props.handleNumber(3)}}>3</button>
                <button id="add" className={"operator" + ((this.operationType === '+' && this.operationFlag) ? " active" : "")} onClick={()=>{this.props.handleOperation('+')}}>+</button>
                <button id="zero" className="span-two number corner4" onClick={() => {this.props.handleNumber(0)}}>0</button>
                <button id="decimal" className="decimal number" onClick={() => {this.props.handleNumber('.')}}>.</button>
                <button id="equals" className="operator corner3" onClick={()=>{this.props.handleOperation('=')}}>=</button>
            </div>
        );
    }
}

export default Buttons;
