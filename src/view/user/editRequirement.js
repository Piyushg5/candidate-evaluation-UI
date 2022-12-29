import React, { useState } from "react";
import {Container, Grid, makeStyles, Typography, InputLabel, Paper, Box} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axios from 'axios'

const defaultValues = {
  position: 'Tech Lead',
  job_location:"Pune",
  department: "Dept",
  experience_level:"1",
  project_name: "Demo",
  position_type: "Full Time",
  job_description:"JD"
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
      marginTop:25
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

    margin:'10px auto'
  }

}))

const Form = (props) => {

  const classes = candidateStyle();
  const [formValues, setFormValues] = useState(defaultValues);
  const pos = ["Tech Lead", "Manager", "Sr. Associate", "Associate"];
  const jobl = ["Pune", "Mumbai", "Bengaluru"];
  const posty = ["Full Time", "Contract"];
  const id = props.location.id;
  console.log(props);
  if(!id)
  {
      window.location="/requirements"
  }

  React.useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/requirement/update/'+id,
    })
      .then((response) => {
          setFormValues(response.data); 
          console.log(response.data); 
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
    axios({
      method: 'post',
      url: 'http://localhost:8080/requirement/update/'+id,
      data:formValues,
    //   headers: {'Content-Type': 'application/json'},
    }).then((response) =>{
      console.log(response.status);
      window.location ='/requirements';
      console.log(response.data);
  }).catch((err) => {console.log(err.response.data);});

  };

  return (
    <div  className={classes.root}>
      <Container>
        <Grid item xs={12}>
      <Typography  className={classes.Heading}>Add Requirement</Typography>
        </Grid>
    <form onSubmit={handleSubmit}>
    <Paper elevation={10} className={classes.PaperSt}>
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
          <FormControl className={classes.formControl} required>
          <InputLabel id="demo-simple-select-label">Position</InputLabel>
            <Select
              name="position"
              value={formValues.position}
              onChange={handleInputChange}
            >
              {pos.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.formControl} required>
          <InputLabel id="demo-simple-select-label">Job Location</InputLabel>
            <Select
              name="job_location"
              value={formValues.job_location}
              onChange={handleInputChange}
            >
              {jobl.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      <Grid item xs={6}>
          <TextField className={classes.textfields}
            id="name-department"
            name="department"
            label="Department"
            type="text"
            required
            variant="outlined"
            value={formValues.department}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.formControl} required>
          <InputLabel id="demo-simple-select-label">Position Type</InputLabel>
            <Select
              name="position_type"
              value={formValues.position_type}
              onChange={handleInputChange}
            >
              {posty.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField className={classes.textfields}
            id="name-experience_level"  
            name="experience_level"
            label="Experience Level"
            type="text"
            required
            variant="outlined"
            value={formValues.experience_level}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField className={classes.textfields}
            id="name-project_name"  
            name="project_name"
            label="Project Name"
            type="text"
            required
            variant="outlined"
            value={formValues.project_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            id="input-job_description"
            name="job_description"
            label="Job Description"
            type="text"
            required
            multiline
            rows={4}
            style={{width:'80%', marginTop:10}}
            variant="outlined"
            value={formValues.job_description}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Grid item={12}>
        <Button className={classes.Button} variant="contained" color="primary" type="submit" >
          Submit
        </Button>
        </Grid>
      </Box>
      </Paper>
    </form>
    </Container>
    </div>
  );
};
export default Form;