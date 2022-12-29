import { Avatar, Drawer, Hidden, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import React from "react";
import logo from "../../images/logo.png"
import { useHistory, useLocation } from "react-router";


const LeftbarStyle = makeStyles(theme => ({
    drawer:{
        [theme.breakpoints.up('sm')]:{
        width: "200px"
        }
    },
    drawerPaper:{
        width:"200px",
    },
    logoDiv:{
        borderBottom: '0.5px solid #ededed',
        padding: theme.spacing(2)
    },
    topbarLogo:{
        height: theme.spacing(4),
        width: theme.spacing(20),

    },
    active: {
        color: "#1265c3",
        fontWeight:"bold",
        textDecoration:'none',
        borderBottom: "0.5px solid #ededed"
    },
    notActive:{
        backgroundColor: "#f6f6f6",
        borderBottom: "0.5px solid #ededed"
    },
}))

const LeftbarData = [
    {
        id: 1,
        title: 'Requirements',
        path : '/requirements'
    },
    {
        id: 2,
        title: 'Candidate',
        path : '/'
    },
    {
        id: 3,
        title: 'Feedback',
        path : '/feedback'
    },
    {
        id: 4,
        title: 'Skills',
        path : '/skills'
    },

]


function LeftbarDesign () {
    const classes = LeftbarStyle();
    const history = useHistory();
    const location = useLocation();
    return (
        <div>
            <div className={classes.logoDiv}>
                <Avatar alt = 'Intelliswift' variant = 'square' src = {logo} className = {classes.topbarLogo} />
            </div>
            {
                LeftbarData.map(item => (
                    <ListItem
                        button 
                        key = {item.id}
                        onClick = {() => history.push(item.path)}
                        className = {location.pathname === item.path? classes.active: classes.notActive}
                    >
                    <ListItemText id="ListItemText" primaryTypographyProps={ location.pathname === item.path ? { style: {fontWeight:'bold'}} : null}>{item.title}</ListItemText>
                    </ListItem>
                ))
            }
        </div>
    )
}


function Leftbar({isMobile, functionSetMobile}){
    const classes = LeftbarStyle();
    return(
        <div>
            <nav className={classes.drawer}>
                <Hidden xsDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        anchor="left"
                        classes ={ {paper: classes.drawerPaper}}
                        >
                        <LeftbarDesign />
                    </Drawer>
                </Hidden>
                <Drawer
                    variant="temporary"
                    open = {isMobile}
                    anchor="left"
                    classes ={ {paper: classes.drawerPaper}}
                    onClick = {functionSetMobile}
                >
                    <LeftbarDesign />
                </Drawer>
            </nav>
        </div>
    )
}
export default Leftbar;