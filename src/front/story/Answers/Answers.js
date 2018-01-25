import React, { Component } from 'react';
import shortid from 'shortid';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import './Answers.css';
import {FlexColumn} from 'front/FlexUtil';

class Answers extends Component {

    constructor() {
        super();

        this.state = {
            open: false,
        }
    }


    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    onAnswer(answer) {
        this.props.onAnswer(answer);
        this.handleClose();
    }

    renderAnswer(answer) {
        return (
            <div className='answer' key={shortid.generate()} onClick={() => this.onAnswer(answer)}>{answer.text}</div>
        );
    }

    render() {

        const actions = [
            <FlatButton
                label="Retour"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        let answers = this.props.answers ? this.props.answers.map((answer) => {return this.renderAnswer(answer)}) : null;

        return (
            <div className="Answers">
                <FlatButton
                    disabled={this.props.disabled}
                    onClick={this.handleOpen} style={{backgroundColor:'#dedede'}}
                    label={this.props.disabled ? "..." : this.props.label }
                    fullWidth={true} />
                <Dialog
                    title=""
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentClassName="dialog-answer">

                    <div className="container">
                        {answers}
                    </div>


                </Dialog>
            </div>
        );
    }

}

export default Answers;
