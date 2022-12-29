import React from "react";
import { AppBar, IconButton, Toolbar, Avatar, makeStyles, Button, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from 'react-router-dom';
import logo from "../../images/logo.png";
import { useMsal } from "@azure/msal-react";

const TopbarStyle = makeStyles(theme =>({
    topbar :{
        [theme.breakpoints.up('sm')]:{
        marginLeft: '200px',   
        },
        backgroundColor: "white",
        borderBottom: "0.5px solid #ededed",
      
    },
    topbarLogo:{
        height: "30px",
        width: "100%"
    },
    topbarContent: {
     
        [theme.breakpoints.up('sm')]:{
        display: 'none',
        }
    },
    button:{
        backgroundColor:"#009bda"
    },
    NavLink:{
        marginLeft: "auto"
    },
    NavlinkButton:{
        textTransform:"Capitalize",
        fontWeight: "bold"
    },
    DivButton:{
        [theme.breakpoints.down('xs')]:{
            display: 'none'
        },
    }
}))
function Topbar({functionSetMobile}) {

    // const handleLogout = () =>{
        
    //     axios({
    //         method: 'get',
    //         url: 'http://localhost:8080/logout',
    //     }).then((response) =>{
    //         window.location =response.data+'http://localhost:3000/login';
    //         console.log(response.data);
    //     })
    // }
    function handleLogout(instance) {
        instance.logoutRedirect().catch(e => {
            console.error(e);
        });
    }
    const classes  = TopbarStyle();
    const { instance } = useMsal();
    return(
        <div>
            <AppBar position="fixed" elevation={0}>
                <Toolbar className={classes.topbar}>
                    <IconButton 
                        className= {classes.topbarContent}
                        onClick = {functionSetMobile}
                    >
                        <MenuIcon />
                    </IconButton> 
                    <div className= {classes.topbarContent}>
                        <Avatar variant="square" alt='Intelliswift' src ={logo} className = {classes.topbarLogo}/>
                    </div>
                    <div className={classes.DivButton}>
                        <Typography
                            color="primary"
                            variant = "outlined" 
                            className={classes.NavlinkButton}
                        >
                            Candidate Evaluation Portal
                        </Typography>
                    </div>
                    <div className={classes.NavLink}>
                        <Button component={Link} to="/user" className={classes.NavlinkButton}>
                            Users
                        </Button>
                        <Button  onClick={()=> handleLogout(instance)}  className={classes.NavlinkButton}>
                             Logout
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default Topbar;