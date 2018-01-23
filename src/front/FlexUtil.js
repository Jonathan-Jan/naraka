import React, { Component } from 'react';

class Flex extends Component {
    render() {
        return (
            <div style={{flex:'1'}}></div>
        );
    }
}

class FlexContainer extends Component {

    getDirection() {
        throw new Error('getDirection not overhidden');
    }

    getStyle() {
        let style = {display:'flex',flexDirection:this.getDirection(),height:'100%',width:'100%',alignItems: 'center',justifyContent: 'center'};
        return style;
    }

    render() {

        const children = React.Children.toArray(this.props.children);

        return (
            <div style={this.getStyle()}>
                {children}
            </div>
        );
    }
}

class FlexRow extends FlexContainer {
    getDirection() {
        return 'row';
    }
}

class FlexColumn extends FlexContainer {
    getDirection() {
        return 'column';
    }
}


export {Flex,FlexRow,FlexColumn};
