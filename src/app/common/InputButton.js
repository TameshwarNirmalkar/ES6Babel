import React from 'react';
import ReactDOM from 'react-dom';

class SAVEBUTTON extends React.Component {
    /**
     * [constructor description]: Inplace of getInitialStates constructor has introduced in React ES6.
     * @param  {[props]} props = [propTypes]
     */
    constructor(props) {
        super(props);
        this.props = props;
    }

    /**
     * [componentWillReceiveProps description] : this calls when state changes
     * @param  {Function} next [give updated props] 
     */
    componentWillReceiveProps(next) {
        // console.log(next);
    }

    render() {
        return (
            <button onClick={ this.props.action } class="btn btn-primary"> { this.props.caption }</button>
        )
    }
}

SAVEBUTTON.propTypes = {
    caption: React.PropTypes.string,
    action: React.PropTypes.func,
};

export default SAVEBUTTON;
