import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class InputTextBox extends Component {
    constructor(props) {
        super(props);
    }

    _onChange(e) {
        this.props.onChange(e.target.value);
    }

    /**
     * [shouldComponentUpdate] : there is a place when you stop rerender copmonent.
     * @param  {[nextProps]}: getting next props
     * @return {[nextState]}: getting next states
     */
    shouldComponentUpdate(nextProps, nextState){
        return !_.isEqual(this.props, nextProps);
    }

    render() {
        return (
            <div>
                <div class="form-group">
                    <label>
                        { this.props.label }
                    </label>                    
                    <input type="text" value={this.props.val} onChange={this._onChange.bind(this)}  placeholder={this.props.placeholder} class="form-control" />
                </div>
            </div>
        );
    }

}

InputTextBox.PropTypes = {
    val: React.PropTypes.string,
    onChange: React.PropTypes.func,
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string
}