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
        this.tableStyle = { marginBottom: 0 + 'px' };
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
        return this.props.items.map(item => <MovieRow {...item} key={item.id} onUpdateRow={this.props.getRowData} onDeleteRow={this.props.deleteRow} />);
    }

    _renderPanel() {
        if (!this.props.items.length) {
            return null;
        }
        return (
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">{this.props.heading}</h3>
                </div>
                <div class="panel-body">
                    <table style={this.tableStyle} class="table table-bordered table-hover">
                        <thead>
                            <tr class={this.props.rowcolor}>
                                <th>Sr. No</th>
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
                <div class="panel-footer">
                    <span>{ this.props.items.length }, records in the table.</span>
                </div>
            </div>
        );
    }

    render() {
        if (!this.props.items) {
            return;
        }
        return (
            <div>
                { this._renderPanel() }
            </div>
        );
    }
}

DATALIST.propTypes = {
    heading: React.PropTypes.string,
    rowcolor: React.PropTypes.string,
    items: React.PropTypes.array,
    getRowData: React.PropTypes.func,
    deleteRow: React.PropTypes.func,
    rowClick: React.PropTypes.func
};

export default DATALIST;
