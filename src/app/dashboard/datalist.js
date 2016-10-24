import React from 'react';
import ReactDOM from 'react-dom';
import MovieRow from './rowcomponent';

class DATALIST extends React.Component {
    /**
     * [constructor description]: Inplace of getInitialStates constructor has introduced in React ES6.
     * @param  {[props]} props = [propTypes]
     */
    constructor(props) {
        super(props);
        this.props = props;
    }

    /**
     * [componentWillReceiveProps description] : this calls when state changes
     * @param  {Function} next [give updated props] 
     */
    componentWillReceiveProps(next) {
        // console.log(next);
    }

    _renderMovies() {
        if (!this.props.items.length) {
            return <tr><td colSpan="4">No records found...</td></tr>;
        }
        return this.props.items.map(item => <MovieRow {...item} key={item.id} onUpdateRow={this.props.updateRow} onDeleteRow={this.props.deleteRow} />);
    }

    render() {
        if (!this.props.items) {
            return;
        }
        return (
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">{this.props.heading}</h3>
                </div>
                <div class="panel-body">

                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Movie</th>
                                <th>Actor</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        { this._renderMovies() }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

DATALIST.propTypes = {
    heading: React.PropTypes.string,
    items: React.PropTypes.array,
    updateRow: React.PropTypes.func,
    deleteRow: React.PropTypes.func,
    rowClick: React.PropTypes.func
};

export default DATALIST;
