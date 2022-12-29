import { Grid, Paper, TextField,Button } from "@material-ui/core";
import React from "react";
import logo from "../auth/logo.png";
import { FaMicrosoft } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { useIsAuthenticated } from "@azure/msal-react";


function Login() {

  
const paperStyle={padding:20, width:280,margin:'20px auto'}
const buttonStyle={padding:8, marginTop:40, background:'red', colour:'white'}
const msStyle={padding:8,marginTop:40, background:'#fff'}


// const  HandleLogin = () =>{

//     axios({
//       method: 'get',
//       url: 'http://localhost:8080/login',
      
//       headers:{
//         'Access-Control-Allow-Origin' : '*',
//         'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//         'Access-Control-Allow-Credentials': 'true',
//         'Access-Control-Allow-Headers': 'Content-Type,X-Auth-Token,Origin,Authorization'

//       }
//     })
//       .then(  (response) => {

//         window.location = response.data
//         console.log(response)
//           console.log(response.status)
//           console.log(response.data)     
//   });
// }

function handleLogin(instance) {
  instance.loginRedirect(loginRequest).then(()=>{
    window.location('/');
  }).catch(e => {
      console.error(e);
  });
}
const { instance } = useMsal();
const isAuthenticated = useIsAuthenticated();
if(isAuthenticated){
    window.location = '/';
}
  return(
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <img src={logo} alt="my logo"/>
          <h4 style={{color:'#1f78b7',margin:'1px'}}>Candidate Evaluation Portal</h4>
          <h2 style={{color:'#1f78b7'}}>LOGIN</h2>
        </Grid>
        <TextField label="Email" placeholder="user@email.com" fullWidth required />
        <TextField style={{margin:'15px 0'}} label="Password" placeholder="password" type="password" fullWidth required />
        <Button component={Link} to="/" style={buttonStyle} type='submit'  variant="contained" fullWidth><b style={{color:'#fff'}}>Login</b></Button>
        {/* <img src={msicon} style={{height:'20px',width:'20px'}} alt="my logo"/> */}

        { isAuthenticated ?
        <Button  style={msStyle} type='submit'  onClick= {() => handleLogin(instance)} variant="contained" fullWidth><b style={{color:'#1f78b7'}}><FaMicrosoft/> Sign in with Microsoft </b></Button>
        : <><Button  style={msStyle} type='submit'  onClick= {() => handleLogin(instance)} variant="contained" fullWidth><b style={{color:'#1f78b7'}}><FaMicrosoft/> Sign in with Microsoft </b></Button>
        <h4>Not Authenticated</h4></>
        }
      </Paper>
    </Grid>
  )
}

export default Login;