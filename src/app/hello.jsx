import React from 'react';
import ReactDOM from 'react-dom';
import ACTIONBUTTON from '../app/world.jsx';

class Hello extends React.Component {
	

	constructor(props){
		super(props);
		this.title = "Add Click";
		this.PROPS = {
			message: "This is first react es6 const",
			fname: "Tameshwar",
			lname: "Nirmalkar",
			profession: "CEO"
		};
		this.propTypes = {
			title: 'Button click'
		};
	}

	checkVal(a){
		const action = new ACTIONBUTTON;
		return () => { console.log(  'this is props ', action ) };
		// console.log(  'this is props ', a );
	}
	// getDefaultProps(){
	// 	const props = {
	// 		message: 'This is Default message',
	// 		fname: "Tameshwar",
	// 		lname : "Nirmalkar",
	// 		profession: "CEO"
	// 	};

	// 	return props;
	// }

	// getInitialState(){

	// }

	componentWillMount(){

	}

	render() {

		return (
			<div>
				<h1>Hello { this.PROPS.fname } { this.PROPS.lname }</h1>
				<ACTIONBUTTON title={ this.prop.title } onClick={ this.checkVal(this.PROPS) } />
				<p></p>
				<ACTIONBUTTON title={ this.title } onClick={ this.checkVal(this.PROPS) } />
				<p></p>
				<ACTIONBUTTON title={ this.title } onClick={ this.checkVal(this.PROPS) } />
			</div>
		)

	}

	componentDidMount(){

	}
}

Hello.propTypes = {
	title: React.PropTypes.string
};

ReactDOM.render(<Hello />, document.getElementById('hello'));