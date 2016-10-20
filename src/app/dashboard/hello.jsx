import React from 'react';
import ReactDOM from 'react-dom';
import ACTIONBUTTON from './world.jsx';

class Hello extends React.Component {

    constructor() {
        super();
        this.title = "Add Click";
        this.PROPS = {
            message: "This is first react es6 const",
            fname: "ABC",
            lname: "DEF",
            profession: "XYZ",
            items: []
        };
        this.state = {
            items: []
        };

    }

    componentDidMount() {
        // console.log('componentDidMount...');
    }

    componentWillMount() {
        fetch('http://localhost:4001/api/posts')
            .then(result => result.json())
            .then(json => {
                // this.PROPS.items = result.json();
                // console.log(json);
                this.setState({
                    items: json
                })
            });
    }

    checkVal(a) {
        const action = new ACTIONBUTTON;
        return () => { console.log('this is props ', action) };
        // console.log(  'this is props ', a );
    }

    render() {

        return (
            <div>
                <h1>Hello { this.PROPS.fname } { this.PROPS.lname }</h1>
                <span>
                    { this.PROPS.message }
                </span>

                <ACTIONBUTTON items={this.state.items} title={ this.title } onClick={ this.checkVal(this.PROPS) } />
            
            </div>
        )

    }
}

ReactDOM.render(<Hello />, document.getElementById('hello'));
