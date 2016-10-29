import React, { Component } from 'react';

class Checkbox extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {
        this.props.onChange({ value: event.target.value });
    }

    render() {
        return (
          <div>
            <label>
              <input type="radio" name="choice" value="M" onChange={this.handleChange.bind(this)} defaultChecked={true} /> { this.props.labelA }
            </label>
            <label>
              <input type="radio" name="choice" value="F" onChange={this.handleChange.bind(this)} /> { this.props.labelB }
            </label>
          </div>
        );
    }
}

Checkbox.propTypes = {
    labelA: React.PropTypes.string,
    labelB: React.PropTypes.string,
    onChange: React.PropTypes.func
};

export default Checkbox;