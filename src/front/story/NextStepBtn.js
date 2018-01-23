import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class NextStepBtn extends Component {

    render() {

        if (!this.props.visible) return (<span className="_NextStepBtn"></span>);

        return (
            <RaisedButton style={{width: '100%',position: 'fixed',bottom: '0'}} label="Continuer..." onClick={this.props.onClick} />
        );
    }

}

export default NextStepBtn;
