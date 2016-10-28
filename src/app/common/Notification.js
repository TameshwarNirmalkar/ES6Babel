import React, {Component, PropTypes} from 'react';

class Notification extends Component {

	constructor(props){
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState){
        return !_.isEqual(this.props, nextProps);
    }

    render(){
    	return ( <span>{ this.props.message}</span> );
    }

}


Notification.PropTypes = {
	message: React.PropTypes.string
};

export default Notification;