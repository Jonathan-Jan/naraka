import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import IconRight from 'material-ui/svg-icons/navigation/chevron-right';
import IconLeft from 'material-ui/svg-icons/navigation/chevron-left';

import _ from 'lodash';
import shortid from 'shortid';

import './Narator.css';
import {Flex,FlexRow} from 'front/FlexUtil';

class Narator extends Component {

    constructor(props){
        super(props);

        this.state = {
            messages:[],
            cursor:0
        }
    }

    componentWillReceiveProps(nextProps) {

        if (!nextProps.messages || nextProps.messages.length === 0) return

        let id = 0;
        let messages = nextProps.messages.map((msg) => {
            let message = _.assign({id:id++}, msg);
            return message;
        });

        this.setState({messages:messages});
    }

    hasPrev() {
        return this.state.cursor > 0;
    }

    previous() {
        this.setState({cursor:this.state.cursor-1});
    }

    hasNext() {
        return this.state.cursor < this.state.messages.length-1;
    }

    next() {
        this.setState({cursor:this.state.cursor+1});
    }

    render() {

        let msg = this.state.messages[this.state.cursor] || {};

        return (
            <div className='Narator'>
                <Flex/>
                <div key={shortid.generate()} className="message">{msg.text}</div>
                <Flex/>
                {(this.hasPrev() || this.hasNext()) &&
                    <FlexRow>
                        <RaisedButton disabled={!this.hasPrev()} icon={<IconLeft/>} onClick={() => this.previous()}/>
                        <RaisedButton disabled={!this.hasNext()} icon={<IconRight/>} onClick={() => this.next()}/>
                    </FlexRow>
                }
            </div>
        );
    }

}

export default Narator;
