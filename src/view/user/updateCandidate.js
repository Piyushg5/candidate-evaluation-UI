import React, { useState } from "react";
import {Container, Grid, makeStyles, Typography, InputLabel, Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axios from 'axios'
// import { useParams } from "react-router-dom";

const defaultValues = {
  candidate_name: "",
  position_applied:"",
  experience_level: "",
  contact_no: "",
  address:"",
  register_date:"",
  last_update:"",
  l1_feedback:{ optradio: '' },
  l2_feedback:{ optradio: '' },
  hr_feedback:{ optradio: '' },
};

const candidateStyle = makeStyles(theme => ({
  root:{
      width:window.innerWidth-220,
      backgroundColor:"#f9f9f9",
      paddingLeft:'1%'
  },
  Heading:{
      fontSize: '30px',
      fontWeight: '600',
      margin:'0',
      display: 'flex'
  },
  Grid:{
      margin: '4% 0'
      
  },
  Box: {
      display:'flex',
  },
  Button:{
      textTransform: 'capitalize',
      margin:'1px',
      marginTop:30
  },
  backdrop: {
      zIndex: theme.zIndex.drawer + 10,
      color: '#fff',
    },
  textfields: {
    padding:5,
    marginTop:10
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
  PaperSt: {
    padding:5,
    height:'80vh',
    width:300,
    margin:'10px auto'
  }

}))

const Form = (props) => {

  const classes = candidateStyle();
  const [formValues, setFormValues] = useState(defaultValues);
  const [options, setData] = React.useState(['defalut', "demo"]);
  // const { id } = useParams();
  const id = props.location.id;
    console.log(props);
    if(!id)
    {
        window.location="/"
    }

    React.useEffect(() => {
          axios({
            method: 'get',
            url: 'http://localhost:8080/candidate/update/'+id,
          })
            .then((response) => {
                setFormValues(response.data); 
                console.log(response.data); 
        });
        axios({
          method: 'get',
          url: 'http://localhost:8080/getSkills',
        })
          .then((response) => {
              setData(response.data); 
      });
    },[]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    axios({
      method: 'post',
      url: 'http://localhost:8080/candidate/update/'+id,
      data:formValues,
    }).then((response) =>{
      console.log(response.status);
      window.location ='/';
      console.log(response.data);
  }).catch((err) => {console.log(err.response.data);});

  };

  return (
    <div  className={classes.root}>
      <Container>
        <Grid item xs={12}>
      <Typography  className={classes.Heading}>Update Candidate</Typography>
        </Grid>
    <form onSubmit={handleSubmit}>
    <Paper elevation={10} className={classes.PaperSt}>
      <Grid container alignItems="center" justify="center" direction="column">
      <Grid item>
          <TextField className={classes.textfields}
            id="name-input"
            name="candidate_name"
            label="Candidate Name"
            type="text"
            required
            value={formValues.candidate_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl} required>
          <InputLabel id="demo-simple-select-label">Position Applied for</InputLabel>
            <Select
              name="position_applied"
              value={formValues.position_applied}
              onChange={handleInputChange}
            >
              {options.map(option => (
              <MenuItem key={option.skill_name} value={option.skill_name}>
                {option.skill_name}
              </MenuItem>
              ))}
              {/* <MenuItem key="python" value="python">
                Python
              </MenuItem>
              <MenuItem key="java" value="java">
                Java
              </MenuItem>
              <MenuItem key="DS" value="DS">
                Data Science
              </MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField className={classes.textfields}
            id="name-experience_level"  
            name="experience_level"
            label="Experience Level"
            type="text"
            required
            value={formValues.experience_level}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField className={classes.textfields}
            id="name-contact_no"  
            name="contact_no"
            label="Contact Number"
            type="text"
            required
            value={formValues.contact_no}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField className={classes.textfields}
            id="input-address"
            name="address"
            label="Address"
            type="text"
            required
            value={formValues.address}
            onChange={handleInputChange}
          />
        </Grid>
        <Button className={classes.Button} variant="contained" color="primary" type="submit" >
          Submit
        </Button>
      </Grid>
      </Paper>
    </form>
    </Container>
    </div>
  );
};
export default Form;