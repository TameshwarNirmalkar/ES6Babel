import React from 'react';
import ReactDOM from 'react-dom';

class MovieRow extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        // this._onUpdate = this._onUpdate.bind(this);
        // this._onDelete = this._onDelete.bind(this);
    }

    componentWillReceiveProps(next) {
        // console.log(next);
    }

    render() {

        return (
            <tr role="button">
	            <td>{ this.props.id }</td>
	            <td>{ this.props.title }</td>
	            <td>{ this.props.author }</td>
	            <td>
	                <a onClick={this._onUpdate.bind(this)} href="javascript:void(0);"><i class="glyphicon glyphicon-edit text-success"> </i></a>
	                <a onClick={this._onDelete.bind(this)} href="javascript:void(0);"><i class="glyphicon glyphicon-remove text-danger"> </i></a>
	            </td>
	        </tr>
        );
    }

    _onUpdate() {
        this.props.onUpdateRow(this.props.id);
    }

    _onDelete() {
        this.props.onDeleteRow(this.props.id);
    }
};

MovieRow.propTypes = {
    id: React.PropTypes.number,
    title: React.PropTypes.string,
    author: React.PropTypes.string,
    onUpdateRow: React.PropTypes.func,
    onDeleteRow: React.PropTypes.func
}

export default MovieRow;
