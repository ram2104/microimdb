import React , {Component} from "react";
import {AppBar, Toolbar, Typography, Icon, Button, Divider, List, ListItem, Drawer, ListItemText} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default class Layout extends Component{

    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this._handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this._handleDrawerClose = this.handleDrawerClose.bind(this);
    }

    handleDrawerOpen(){
        this.setState({ open: true });
    };
    
    handleDrawerClose(){
    this.setState({ open: false });
    };

    render(){
        let { open } = this.state;
        let {className = "", title = "Movies", back = false} = this.props;
        return <div className = "container">
            <AppBar position="static">
                <Toolbar disableGutters={!open}>
                    <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this._handleDrawerOpen}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit">
                        {back ? <span className = "back-button" onClick = {() => window.history.back()}>&#8592;</span> : ""}
                        {title}
                    </Typography>
                </Toolbar>
                <Drawer
                    anchor="left"
                    open={open}
                    onClick={this._handleDrawerClose}
                >
                        <div className = "chevron-left-wrapper">
                            <IconButton onClick={this._handleDrawerClose}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />

                        <List>
                            {['Popular Movies', 'Trending Movies'].map((text, index) => (
                            <ListItem button key={text}>
                                <a href = {this.getNavigationLink(text)}>
                                    <ListItemText primary={text} />
                                </a>
                            </ListItem>
                            ))}
                        </List>

                    </Drawer>
            </AppBar>
            <div className = {`page-content ${className}`}>
                {this.props.children}
            </div>
        </div>
    }

    getNavigationLink(linkLabel){
        let returnUrl = "/";
        switch (linkLabel) {
            case "Popular Movies" : returnUrl = "/"; break;
            case "Trending Movies" : returnUrl = "/movies/trending"; break;
            default : returnUrl = "/";
        }

        return returnUrl;
    }
}