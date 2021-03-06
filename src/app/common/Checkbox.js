import React, { Component } from 'react';
import _ from 'lodash';

class Checkbox extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {
        this.props.onChange({ value: event.target.value });
    }

    isMaleFemale(){
        // const val = false;
        console.log(this.props.isChecked);
    }

    render() {
        return (
          <div>
            <label>
              <input type="radio" onChange={this.handleChange.bind(this)} checked={_.isEqual(this.props.type, 'M')} name={this.props.name} value="M" /> { this.props.labelA }
            </label>
            <label>
              <input type="radio" onChange={this.handleChange.bind(this)} checked={_.isEqual(this.props.type, 'F')} name={this.props.name} value="F" /> { this.props.labelB }
            </label>
          </div>
        );
    }
}

Checkbox.propTypes = {
    name: React.PropTypes.string,
    labelA: React.PropTypes.string,
    labelB: React.PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string
};

export default Checkbox;