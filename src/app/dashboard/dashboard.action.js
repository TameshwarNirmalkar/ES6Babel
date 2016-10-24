const _ = require('lodash');
const $ = require('jquery');

const { AppDispatcher, RestResource } = require('../common');
const Mapper = require('../utils/Mapper');
const Config = require('../utils/Config');
const AuthorRestService = RestResource(Config);

const DashboardEvents = require('./dashboard.events');
const DashboardStore = require('./dashboard.store');

const _SAVE_TEMPLATE_DELAY = 300;
let _updatePromise = null;
let _createPromise = null;

const DashboardAction = {
    setTitle(title) {
        AppDispatcher.dispatch({
            actionType: DashboardEvents.TITLE_CHANGE,
            title: title.target.value
        });
    },

    setAuthor(author) {
        AppDispatcher.dispatch({
            actionType: DashboardEvents.AUTHOR_CHANGE,
            author: author.target.value
        });
    },

    setDashboard() {
        this._saveDashboard();
    },

    _saveDashboard() {
        // _.debounce(() => {
        const data = Mapper.toBackend(DashboardStore.getDashboard());
        data.id ? this._updateDashboard(data) : this._createDashboard(data);
        // console.log(data);
        // }, 300);
    },

    _createDashboard(data) {
        AuthorRestService.post('authors', JSON.stringify(data)).then(dashboard => {
            AppDispatcher.dispatch({
                actionType: DashboardEvents.LOAD_AUTHORS,
                author: dashboard
            });
        });

    },

    updateRow(id) {
        AuthorRestService.get('authors/' + id).then(dashboard => {
            console.log(dashboard);
        })
    },

    rowClick(e) {
        // e.stopPropagation()
        // console.log('Row Click', e.target);
    },

    _updateDashboard(data) {
        const DashboardeEvents = require('./dashboard.events');
        return this._execute(
            _updatePromise = AuthorRestService.put('authors/' + data.id, JSON.stringify(data))
        );
    },

    deleteRow(id) {
        // const uid = $(e.target).attr('data-id');
        // console.log(uid);
        AuthorRestService.delete('authors/' + id).then(dashboard => {
            AppDispatcher.dispatch({
                actionType: DashboardEvents.LOAD_AUTHORS
            });
        })

    },

    _execute(endpoint) {
        AppDispatcher.dispatch({
            actionType: DashboardEvents.DASHBOARD_SAVE_IN_PROGRESS
        });

        return endpoint.then(dashboard => {

            AppDispatcher.dispatch({
                actionType: DashboardEvents.DASHBOARD_SAVED,
                dashboard: Mapper.fromBackend(dashboard)
            });

            return dashboard;

        }).fail(error => {

            if (_updatePromise.isAborted) {
                AppDispatcher.dispatch({
                    actionType: DashboardEvents.DASHBOARD_SAVE_ABORTED
                });

                return;
            }

            AppDispatcher.dispatch({
                actionType: DashboardEvents.DASHBOARD_SAVE_FAILED
            });
        });
    },

    _setUrl(templateId) {
        const locationUrl = window.location.href.replace(/[^\/]+((\?.*)?$|\/$)/, templateId);
        window.history.replaceState({}, 'Create template', locationUrl);
    }
};

module.exports = DashboardAction;
