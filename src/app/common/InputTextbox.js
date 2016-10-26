import React from 'react';
import ReactDOM from 'react-dom';

class INPUTTEXTBOX extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    _onChange(e) {
        this.props.onChange(e.target.value);
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

INPUTTEXTBOX.propTypes = {
    val: React.PropTypes.string,
    onChange: React.PropTypes.func,
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string
}

module.exports = INPUTTEXTBOX;
