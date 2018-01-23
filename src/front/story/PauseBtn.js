import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import IconPause from 'material-ui/svg-icons/av/pause';
import IconPlay from 'material-ui/svg-icons/av/play-arrow';

class PauseBtn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isPaused: false,
        }
    }

    toggle() {
        this.props.onPause();
        this.setState({isPaused:!this.state.isPaused});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isPaused:nextProps.isPaused});
    }

    render() {
        return (
            <RaisedButton onClick={() => {this.toggle()}} icon={this.state.isPaused ? <IconPlay/> : <IconPause />}/>
        );
    }

}

export default PauseBtn;
