/*eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
/*eslint-enabled no-unused-vars*/

class RowComponent extends Component {

    constructor(props) {
        super(props);
        // this.props = props;
    }

    componentWillReceiveProps(next) {
        // console.log(next);
    }

    render() {

        return (
            <tr onClick={this._onUpdate.bind(this)} role="button">
	            <td>{ this.props.id }</td>
	            <td>{ this.props.title }</td>
	            <td>{ this.props.author }</td>
                <td>{ this.props.gender }</td>
	            <td>
	                <a href="javascript:void(0);"><i class="glyphicon glyphicon-edit text-success hidden"> </i></a>
	                <a onClick={this._onDelete.bind(this)} href="javascript:void(0);"><i class="glyphicon glyphicon-remove-circle text-danger"> </i></a>
	            </td>
	        </tr>
        );
    }

    _onUpdate() {
        this.props.onUpdateRow(this.props.id);
    }

    _onDelete(e) {
        e.stopPropagation();
        this.props.onDeleteRow(this.props.id);
    }
};

RowComponent.propTypes = {
    id: React.PropTypes.number,
    title: React.PropTypes.any,
    author: React.PropTypes.any,
    onUpdateRow: React.PropTypes.func,
    onDeleteRow: React.PropTypes.func
};

export default RowComponent;
