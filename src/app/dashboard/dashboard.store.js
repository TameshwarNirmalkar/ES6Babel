const _ = require('lodash');
const update = require('react-addons-update');

const { AppDispatcher } = require('../common/index');
const BaseStore = require('../utils/BaseStore');
const DashboardEvents = require('./dashboard.events');
const DashboardModel = require('./dashboard.model');

let _authorlists = null;
let _dashboard = new DashboardModel();

const DashboardStore = Object.assign({}, BaseStore, {

    fetchAuthorsLists() {
        fetch('http://localhost:4001/api/authors')
            .then(result => result.json())
            .then(authorlists => {
                AppDispatcher.dispatch({
                    actionType: DashboardEvents.AUTHORS_LOADED,
                    authorlists
                });
            });
    },

    getAuthors() {
        return _authorlists;
    },

    getDashboard() {
        return _dashboard;
    },

    getRowColor() {
        return 'success';
    },

    _setAuthors(authorlists) {
        _authorlists = authorlists;
    },

    _setTitle(title) {
        this._updateDashboardWith({ title: { $set: title } });
    },

    _setAuthor(author) {
        this._updateDashboardWith({ author: { $set: author } });
    },

    _setDashboard(dashboard) {
        this._updateDashboardWith({ $set: dashboard });
    },

    _updateDashboardWith(updates) {
        _dashboard = update(_dashboard, updates);
    },

    _saveInProgress() {
        console.log('INPROGRESS');
    },

    _saveDashboard() {
        console.log('SAVED');
    },

    _resetDashboard() {
        _dashboard = new DashboardModel();
    }

});

DashboardStore.registerWithDispatcher(payload => {
    // console.log('Payload: ', payload);
    switch (payload.actionType) {
        case DashboardEvents.LOAD_AUTHORS:
            DashboardStore.fetchAuthorsLists();
            DashboardStore._emitChange();

        case DashboardEvents.AUTHORS_LOADED:
            DashboardStore._setAuthors(payload.authorlists);
            DashboardStore._emitChange();
            break;

        case DashboardEvents.TITLE_CHANGE:
            DashboardStore._setTitle(payload.title);
            DashboardStore._emitChange();
            break;

        case DashboardEvents.AUTHOR_CHANGE:
            DashboardStore._setAuthor(payload.author);
            DashboardStore._emitChange();
            break;

        case DashboardEvents.DASHBOARD_SAVE_IN_PROGRESS:
            DashboardStore._saveInProgress();
            DashboardStore._emitChange();
            break;

        case DashboardEvents.DASHBOARD_SAVED:
            DashboardStore._saveDashboard(payload);
            // DashboardStore._resetDashboard();
            DashboardStore._emitChange();
            break;

        case DashboardEvents.DASHBOARD_SAVE_FAILED:
            DashboardStore._saveDashboard(payload);
            DashboardStore._emitChange();
            break;

        case DashboardEvents.DASHBOARD_SAVE_ABORTED:
            DashboardStore._saveDashboard(payload);
            DashboardStore._emitChange();
            break;
        
        case DashboardEvents.FILL_AUTHOR:
            DashboardStore._setDashboard(payload.author);
            DashboardStore._emitChange();
            break;
    }
});

module.exports = DashboardStore;
