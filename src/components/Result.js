import React from 'react';
import './Result.css';

class Result extends React.Component {
    render () {
        return(
            <div id="displayWrapper"> 
              <p id="display" className="main-result">{this.props.display}</p>
            </div>
        );
    }
}

export default Result;