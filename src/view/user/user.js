import { Grid, Paper,Button } from "@material-ui/core";
import React from "react";
import logo from "../auth/logo.png";
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


function User() {

  
const paperStyle={padding:20, width:'25%',margin:'20px auto'}
const buttonStyle={padding:8, marginTop:40, background:'red', colour:'white'}



var sessionKey = sessionStorage.key(2);
    console.log('session storage name',sessionKey);  
    var item_value = sessionStorage.getItem(sessionKey);
    console.log('session storage',item_value);
    const sname = JSON.parse(item_value)
    console.log(sname.name)
  return(
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <img src={logo} alt="my logo"/>
          <h2 style={{color:'#1f78b7',margin:'1px'}}>Profile</h2>
          <Stack style={{alignItems:'center',margin:10}}>
          <Avatar sx={{bgcolor:'#d113f0fa'}}>{sname.name[0]}</Avatar>
          </Stack>
          <h4 >Name : {sname.name} </h4>
          <h4 >User Name : {sname.username} </h4>
        </Grid>
        <Button component={Link} to="/" style={buttonStyle} type='submit'  variant="contained" fullWidth><b style={{color:'#fff'}}>Back</b></Button>
        
      </Paper>
    </Grid>
  )
}

export default User;