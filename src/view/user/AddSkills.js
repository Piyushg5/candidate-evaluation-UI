import { Container,  Grid, IconButton, Button, TextField, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import {AddBox , Close }from "@material-ui/icons";
import axios from 'axios'


const addSkillsStyle = makeStyles(theme => ({
    root:{
        width:window.innerWidth-220,
        backgroundColor:"#f9f9f9",
        margin:"10px"
    },
    form :{
        backgroundColor:'white',
        padding: '4%'
    },
    selectedButton:{
        backgroundColor:'white',
        margin:'1px',
        textTransform:'none'
    }
}))

function AddSkills (){
    const classes = addSkillsStyle()
    let   [inputValue, setInputValue] = React.useState("");
    const [selecteddata, setSelectedData] = React.useState([]);
    const [skillName, setSkillName] =React.useState('');
   function addItem() {
    if (inputValue) {
      setSelectedData(selecteddata, selecteddata.push(inputValue));
      setInputValue("");
      console.log(selecteddata)
    } else alert("Kindly enter the project ID");
  }

   const deleteItem = (e) => {
    const name = e;
    setSelectedData(
      selecteddata.filter(function (item) {
        return item !== name;
      })
    )}

    const AddNewSkill = () =>{
        console.log("hi")
        let skillData = {
            skill_name: skillName,
            sub_skill_name : selecteddata
        }
        console.log(skillData)

        axios({
            method: 'post',
            url: 'http://localhost:8080/skills/add',
            data:skillData,
          })
          .then((response) =>{
            console.log(response.status);
            window.location ='/skills';
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err.response.data);
        });
    }
    
    
    return(
        <div>
            <Container className={classes.root}>
                <Grid item xs={12}>
                    {/* <Box component='form' onSubmit={() => AddNewSkill()} >
                        <FormControl> */}
                            <Grid container spacing={2} className={classes.form}>
                                <Grid item xs={12}>
                                <Typography variant="h4">Add Skills</Typography>
                                    <TextField
                                        name="skill_name"
                                        label="Skill Name"
                                        placeholder="Skill Name"
                                        required
                                        fullWidth
                                        id="outlined-basic"
                                        variant="outlined"
                                        value={skillName}
                                        onChange={(e) => setSkillName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                  <Grid container >
                                        <Grid item xs ={9}>
                                            <TextField
                                                variant="outlined"
                                                name="inputValue"
                                                fullWidth
                                                placeholder="Enter Sub Skill Name"
                                                margin="normal"
                                                InputLabelProps={{
                                                shrink: true,
                                                }}
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs ={3}>
                                            <IconButton aria-label="Add" style={{marginTop :'15px'}} onClick={addItem} className="add">
                                                <AddBox />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={12}>
                                {selecteddata.map((val) => {
                                    return (
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        className = {classes.selectedButton}
                                        onClick={(e) => {
                                        deleteItem(val);
                                        }}
                                    >
                                        <Grid item md={9}>
                                        {val}
                                    </Grid>
                                    <Grid item md={3}>
                                    <Close  style={{marginTop :'5px'}}/>
                                    </Grid>
                                    </Button>
                                        
                                    )
                                })}
                                </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        onSubmit={()=>AddNewSkill()}
                                        onClick={()=>AddNewSkill()}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        {/* </FormControl>
                    </Box> */}
                </Grid>

            </Container>
        </div>
    )

}

export default AddSkills;