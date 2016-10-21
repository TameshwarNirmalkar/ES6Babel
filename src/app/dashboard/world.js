import React from 'react';
import ReactDOM from 'react-dom';

class ACTIONBUTTON extends React.Component {
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
        console.log(next);
    }

    render() {
        return (
            <div>
                <ul>
                {
                    this.props.items.map( item => {
                        return <li key={item.id}> { item.title }</li>;

                    })
                }
                </ul>
                <div>
                    <button onClick={ this.props.onClick }> { this.props.title }</button> 
                </div>
            </div>
        )
    }
}

ACTIONBUTTON.propTypes = {
    title: React.PropTypes.string,
    items: React.PropTypes.array,
    onClick: React.PropTypes.func,
};

export default ACTIONBUTTON;
