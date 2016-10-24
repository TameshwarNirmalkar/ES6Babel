import React from 'react';
import ReactDOM from 'react-dom';

class INPUTTEXTBOX extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    render() {
        return (
            <div>
                <div class="form-group">
                    <label>
                        { this.props.label }
                    </label>                    
                    <input type="text" value={this.props.val} onChange={this.props.onChange}  placeholder={this.props.placeholder} class="form-control" />
                </div>

        	</div>

        );
    }

}

INPUTTEXTBOX.propTypes = {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string
}

module.exports = INPUTTEXTBOX;
