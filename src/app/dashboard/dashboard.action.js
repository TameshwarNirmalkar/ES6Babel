const _ = require('lodash');

const { AppDispatcher, RestResource } = require('../common');
const Mapper = require('../utils/Mapper');
const Config = require('../utils/Config');
const AuthorRestService = RestResource(Config);

const DashboardEvents = require('./dashboard.events');
const DashboardStore = require('./dashboard.store');

const _SAVE_TEMPLATE_DELAY = 300;
let _updatePromise = null;
let _createPromise = null;

class DashboardAction {

    fetchAuthorsLists() {
        AppDispatcher.dispatch({
            actionType: DashboardEvents.AUTHORS_LOADING,
            notification: {
                message: 'Loading...'
            }
        });

        fetch('http://localhost:4001/api/authors')
            .then(result => result.json())
            .then(authorlists => {
                setTimeout(() => {
                    AppDispatcher.dispatch({
                        actionType: DashboardEvents.AUTHORS_LOADED,
                        authorlists,
                        notification: {
                            message: 'Authors loaded'
                        }
                    });
                }, 1000);
            });
    }

    setTitle(title) {
        AppDispatcher.dispatch({
            actionType: DashboardEvents.TITLE_CHANGE,
            title: title
        });
    }

    setAuthor(author) {
        AppDispatcher.dispatch({
            actionType: DashboardEvents.AUTHOR_CHANGE,
            author: author
        });
    }

    getNotification() {
        return _notification;
    }

    saveDashboard() {
        this._saveDashboard();
    }

    _saveDashboard() {
        // _.debounce(() => {
        const data = Mapper.toBackend(DashboardStore.getDashboard());
        data.id ? this._updateDashboard(data) : this._createDashboard(data);
        // }, 300);
    }

    _createDashboard(data) {
        return this._execute(
            _createPromise = AuthorRestService.post('authors', JSON.stringify(data))
        );

        // AuthorRestService.post('authors', JSON.stringify(data)).then(dashboard => {
        //     console.log( dashboard );
        //     AppDispatcher.dispatch({
        //         actionType: DashboardEvents.FETCH_AUTHORS,
        //         author: dashboard
        //     });
        // });

    }

    _updateDashboard(data) {
        console.log('Update method: ', data );
        return this._execute(
            _updatePromise = AuthorRestService.put('authors/' + data.id, JSON.stringify(data))
        );

        /*AuthorRestService.put('authors/' + data.id, JSON.stringify(data)).then(dashboard => {
           AppDispatcher.dispatch({
                actionType: DashboardEvents.FETCH_AUTHORS,
                author: dashboard
            }); 
        })*/
    }

    getRowData(id) {
        AuthorRestService.get('authors/' + id).then(authordetails => {
            AppDispatcher.dispatch({
                actionType: DashboardEvents.FILL_AUTHOR,
                author: Mapper.fromBackend(authordetails)
            });
        })
    }

    deleteRow(id) {
        AuthorRestService.delete('authors/' + id).then(dashboard => {
            AppDispatcher.dispatch({
                actionType: DashboardEvents.DELETE_AUTHOR,
                authorId: id
            });
        })
    }

    _execute(endpoint) {
        console.log('Excute method: ');
        AppDispatcher.dispatch({
            actionType: DashboardEvents.DASHBOARD_SAVE_IN_PROGRESS
        });

        return endpoint.then(author => {
            console.log('Inside callback : ', Mapper.fromBackend(author));
            AppDispatcher.dispatch({
                actionType: DashboardEvents.DASHBOARD_SAVED,
                author: Mapper.fromBackend(author)
            });

            return author;

        }).fail(error => {

            if (_updatePromise && _updatePromise.isAborted) {
                AppDispatcher.dispatch({
                    actionType: DashboardEvents.DASHBOARD_SAVE_ABORTED
                });

                return;
            }

            AppDispatcher.dispatch({
                actionType: DashboardEvents.DASHBOARD_SAVE_FAILED
            });
        });
    }

    _setUrl(id) {
        const locationUrl = window.location.href.replace(/[^\/]+((\?.*)?$|\/$)/, id);
        window.history.replaceState({}, 'Create template', locationUrl);
    }
}

export let DashboardActions = new DashboardAction();
