import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import history from 'front/app/history';

class MainMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    handleClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
  };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    onItemClick = (event, menuItem) => {
        switch (menuItem.key) {
            case 'menu_goto_home' :
                history.goHome();
                return;
            default:
                return;
        }
    };

    render() {
        return (
            <div>
                <RaisedButton style={{minWidth: '40px'}} onClick={this.handleClick} icon={<NavigationMenu />}/>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    >
                        <Menu onItemClick={this.onItemClick}>
                            <MenuItem key='menu_goto_home' primaryText="Accueil" />
                            <MenuItem primaryText="Aide" />
                        </Menu>
                </Popover>
            </div>
        );
    }

}

export default MainMenu;
