import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import DashboardStore from './dashboard.store';
import { DashboardActions } from './dashboard.action';

import INPUTTEXTBOX from '../common/InputTextbox';
import SAVEBUTTON from '../common/InputButton';
import DATALIST from './datalist';
import { DashboardServices } from './test';

class DASHBOARD extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authorlist: [],
            dashboard: DashboardStore.getDashboard(),
            rowcolor: DashboardStore.getRowColor()
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
        this.setState({
            authorlist: DashboardStore.getAuthors(),
            dashboard: DashboardStore.getDashboard()
        });
    }

    getTitleProps() {
        return {
            label: 'Movie Name',
            placeholder: 'Enter any movie name',
            val: _.get(this.state, 'dashboard.title'),
            onChange: DashboardActions.setTitle
        }
    }

    getAuthorProps() {
        return {
            label: 'Movie Cast',
            placeholder: 'Actor and actoress name',
            val: _.get(this.state, 'dashboard.author'),
            onChange: DashboardActions.setAuthor
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
            rowcolor: this.state.rowcolor,
            items: this.state.authorlist,
            getRowData: DashboardActions.getRowData,
            deleteRow: DashboardActions.deleteRow
        }
    }

    _saveDashboard() {
        DashboardActions.saveDashboard();
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
