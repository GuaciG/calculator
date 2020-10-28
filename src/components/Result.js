import React from 'react';
import './Result.css';

class Result extends React.Component {
    render () {
        return(
            <div id="display"> 
              {this.props.display}
            </div>
        );
    }
}

export default Result;