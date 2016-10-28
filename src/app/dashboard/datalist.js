import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import RowComponent from './rowcomponent';

class DATALIST extends Component {
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
        return this.props.items.map(item => <RowComponent {...item} key={item.id} onUpdateRow={this.props.getRowData} onDeleteRow={this.props.deleteRow} />);
    }

    _renderPanel() {
        return (
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">{this.props.heading}</h3>
                </div>
                <div class="panel-body">
                    <table style={this.tableStyle} class="table table-bordered table-hover">
                        <thead>
                            <tr class={this.props.rowcolor}>
                                <th class="col-lg-2" width="60">Sr. No</th>
                                <th class="col-lg-4" width="">Movie</th>
                                <th class="col-lg-4" width="">Actor</th>
                                <th class="col-lg-2" width="60">Action</th>
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
            return null;
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
