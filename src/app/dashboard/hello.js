import React from 'react';
import ReactDOM from 'react-dom';
import ACTIONBUTTON from './world.js';
import DashboardStore from './dashboard.store.js';

class Hello extends React.Component {

    constructor(props) {
        super(props);
        this.title = 'Add Button';
        this.props = props;
        this.state = {
            authorlist: []
        };

        this._onStateChange = this._onStateChange.bind(this);
    }

    componentWillMount() {
        DashboardStore.fetchAuthorsLists();
        DashboardStore.addChangeListener(this._onStateChange);
    }

    componentWillUnmount() {
        DashboardStore.removeChangeListener(this._onStateChange);
    }

    _onStateChange() {
        this.setState({ authorlist: DashboardStore.getAuthors() });
    }

    _checkVal(a) {
        return () => { console.log("ACTIONBUTTON ", a); };
    }

    render() {

        return (
            <div>
               <ACTIONBUTTON items={this.state.authorlist} title={ this.title } onClick={ this._checkVal(this.props) } />
            </div>
        )

    }
}

ReactDOM.render(<Hello />, document.getElementById('hello'));
