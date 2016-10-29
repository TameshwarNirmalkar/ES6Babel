/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import DashboardStore from './dashboard.store';
import DashboardActions from './dashboard.action';

import INPUTTEXTBOX from '../common/InputTextbox';
import InputButton from '../common/InputButton';
import CheckBox from '../common/Checkbox';
import DATALIST from './datalist';
import Notification from '../common/Notification';
/*eslint-enable no-unused-vars*/

class DASHBOARD extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authorlist: DashboardStore.getAuthors() || [],
            dashboard: DashboardStore.getDashboard(),
            rowcolor: DashboardStore.getRowColor(),
            buttondisabled: DashboardStore.getButtonDisabled(),
            notification: DashboardStore.getNotification()
        };

        this._onStateChange = this._onStateChange.bind(this);
    }
    /**
     * [componentWillMount description]: it is more or less initialize state which is basically null all state here
     * @return {[type]} [description]
     */
    componentWillMount() {
        DashboardStore.addChangeListener(this._onStateChange);
    }
    /**
     * [componentDidMount description]: this will usefull when you have asynchronized all and here dom will be available
     * @return {[type]} [description]
     */
    componentDidMount() {
        DashboardActions.fetchAuthorsLists();
    }

    componentWillUnmount() {
        DashboardStore.removeChangeListener(this._onStateChange);
    }

    _onStateChange() {
        this.setState({
            authorlist: DashboardStore.getAuthors(),
            dashboard: DashboardStore.getDashboard(),
            buttondisabled: DashboardStore.getButtonDisabled(),
            notification: DashboardStore.getNotification()
        });
    }

    getTitleProps() {
        return {
            label: 'Movie Name',
            placeholder: 'Enter any movie name',
            val: _.get(this.state, 'dashboard.title'),
            onChange: DashboardActions.setTitle
        };
    }

    getAuthorProps() {
        return {
            label: 'Movie Cast',
            placeholder: 'Actor and actoress name',
            val: _.get(this.state, 'dashboard.author'),
            onChange: DashboardActions.setAuthor
        };
    }

    getCheckboxProps(){
        return {
            labelA: 'Male',
            labelB: 'Female',
            onChange: DashboardActions.setMaleFemale
        };
    }

    getNewButtonProps() {
        return {
            caption: 'Reset',
            action: this._reset
        };
    }

    getSaveButtonProps() {
        return {
            caption: 'Save Data',
            action: this._saveDashboard,
            buttondisabled: DashboardStore.getButtonDisabled()
        };
    }

    getDataProps() {
        return {
            heading: 'Movie List',
            rowcolor: this.state.rowcolor,
            items: this.state.authorlist,
            getRowData: DashboardActions.getRowData,
            deleteRow: DashboardActions.deleteRow
        };
    }
    
    _reset() {
        DashboardStore._resetDashboard();
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
                            <CheckBox {...this.getCheckboxProps()} />
                        </div>
                        <div class="panel-footer">
                            <span class="text-right"><InputButton {...this.getSaveButtonProps()} /></span>
                            <span class="text-left"><InputButton {...this.getNewButtonProps()} /></span>
                            <span class="pull-right"> <Notification {...this.state.notification} /></span>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <DATALIST {...this.getDataProps()} />
                </div>
                </div>
            </div>
        );

    }
}

export default DASHBOARD;

ReactDOM.render(<DASHBOARD />, document.getElementById('mainapp'));
