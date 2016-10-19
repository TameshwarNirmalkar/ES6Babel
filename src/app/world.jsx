import React from 'react';
import ReactDOM from 'react-dom';

// const ACTIONBUTTON = React.createClass({

// 	displayName: 'ActionButton',

// 	propTypes: {
// 		title: React.PropTypes.string,
// 		onClick: React.PropTypes.func
// 	},

// 	render() {
// 		return (
// 			<div>
// 				<button onClick={ this.props.onClick }>{ this.props.title }</button>
// 			</div>
// 		);
// 	}

// })

class ACTIONBUTTON extends React.Component {

    constructor(props) {
        super(props);
        this.state = { items: [] };
    }

    componentDidMount() {
        // fetch('http://geo.groupkt.com/ip/116.74.235.93/json') 
        //     .then(result => {
        //         this.setState({ items:result.json() });
        //     });
    }

    render() {
        return (
            <div>
				{ 
					this.state.items.map( item => { 
						return <div>
						{ 
							item
						}
						</div>
					}) 
				}  
            
				<button onClick={ this.props.onClick }> { this.props.title }</button>
			</div>
        )
    }
}

ACTIONBUTTON.propTypes = {
    title: React.PropTypes.string,
    fname: React.PropTypes.string,
    lname: React.PropTypes.string,
    profession: React.PropTypes.string,
    qualification: React.PropTypes.string,
    onClick: React.PropTypes.func
};



export default ACTIONBUTTON;

// ReactDOM.render(<World/>, document.getElementById('world'));
