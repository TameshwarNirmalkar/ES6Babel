import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import DashboardStore from './dashboard.store';
import DashboardAction from './dashboard.action';

import INPUTTEXTBOX from '../common/InputTextbox';
import SAVEBUTTON from '../common/InputButton';
import DATALIST from './datalist';

class DASHBOARD extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authorlist: [],
            dashboard: DashboardStore.getDashboard()
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

    getTitleProps() {
        return {
            label: 'Movie Name',
            placeholder: 'Enter any movie name',
            value: _.get(this.state, 'dashboard.title'),
            onChange: DashboardAction.setTitle
        }
    }

    getAuthorProps() {
        return {
            label: 'Movie Cast',
            placeholder: 'Actor and actoress name',
            value: _.get(this.state, 'dashboard.author'),
            onChange: DashboardAction.setAuthor
        }
    }

    getSaveProps() {
        return {
            caption: 'Save Data',
            action: this._saveDashboard
        };

    }

    getDataProps() {
        return {
            heading: 'Movie List',
            items: this.state.authorlist,
            updateRow: DashboardAction.updateRow,
            deleteRow: DashboardAction.deleteRow
        }
    }

    _saveDashboard() {
        DashboardAction.setDashboard();
    }

    render() {

        return (
            <div class="container">
                <div class="row">
                <div class="col-md-6">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title">Add Author</h3>
                        </div>
                        <div class="panel-body">
                            <INPUTTEXTBOX {...this.getTitleProps()} />
                            <INPUTTEXTBOX {...this.getAuthorProps()} />
                        </div>
                        <div class="panel-footer">
                            <SAVEBUTTON {...this.getSaveProps()} />
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <DATALIST {...this.getDataProps()} />
                </div>
                </div>
            </div>
        )

    }
}

ReactDOM.render(<DASHBOARD />, document.getElementById('mainapp'));
