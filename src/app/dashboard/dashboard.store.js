const _ = require('lodash');
// const update = require('react-addons-update');

const { AppDispatcher } = require('../common/index');
const BaseStore = require('../utils/BaseStore');
// const BaseStore = require('../common/BaseStore');
const DashboardEvents = require('./dashboard.events');

let _authorlists = null;
// console.log(BaseStore);
const DashboardStore = Object.assign({}, BaseStore, {

    fetchAuthorsLists() {
        fetch('http://localhost:4001/api/authorlists')
            .then(result => result.json())
            .then(authorlists => {
                AppDispatcher.dispatch({
                    actionType: DashboardEvents.AUTHORS_LOADED,
                    authorlists
                });
            });
    },

    _setAuthors(authorlists) {
        _authorlists = authorlists;
    },

    getAuthors() {
        return _authorlists;
    }

});

DashboardStore.registerWithDispatcher(payload => {
    switch (payload.actionType) {
        case DashboardEvents.AUTHORS_LOADED:
            DashboardStore._setAuthors(payload.authorlists);
            DashboardStore._emitChange();
            break;
    }
});

module.exports = DashboardStore;
