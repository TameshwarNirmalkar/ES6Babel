import React from 'react';
import ReactDOM from 'react-dom';

// const ACTIONBUTTON = React.createClass({

//  displayName: 'ActionButton',

//  propTypes: {
//      title: React.PropTypes.string,
//      onClick: React.PropTypes.func
//  },

//  render() {
//      return (
//          <div>
//              <button onClick={ this.props.onClick }>{ this.props.title }</button>
//          </div>
//      );
//  }

// })

class ACTIONBUTTON extends React.Component {

    constructor() {
        super();
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
