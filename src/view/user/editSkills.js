import { Container,  Grid, IconButton, Button, TextField, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import {AddBox , Close }from "@material-ui/icons";
import axios from 'axios'

const editSkillsStyle = makeStyles(theme => ({
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

function editSkills (props){
    const classes = editSkillsStyle()
    let   [inputValue, setInputValue] = React.useState("");
    const [selecteddata, setSelectedData] = React.useState([]);
    const [skillName, setSkillName] = React.useState('');
    //const [data, setData] = React.useState();
    const id = props.location.id;
    console.log(id)
    if(!id)
    {
        window.location="/skills"
    }
    React.useEffect(() => {
    axios({
        method: 'get',
        url: 'http://localhost:8080/skill/getSkills/'+id,
      })
      .then((response) =>{
        console.log(response.status);
            setSelectedData(response.data.sub_skill_name)
            setSkillName(response.data.skill_name)
            console.log(response.data);
    })
}, []);
  
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

    const EditSkillData = () =>{
        console.log("hi")
        let skillData = {
            skill_name: skillName,
            sub_skill_name : selecteddata
        }
        console.log(skillData)

        axios({
            method: 'post',
            url: 'http://localhost:8080/skills/update/'+id,
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
                    <Grid container spacing={2} className={classes.form}>
                        <Grid item xs={12}>
                        <Typography variant="h4">Edit Skills</Typography>
                            <TextField
                                name="skill_name"
                                label="Skill Name"
                                placeholder="Skill Name"
                                required
                                //defaultValue={data.skill_name}
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
                                       // defaultValue={data.sub_skill_name}
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
                                onSubmit={()=>EditSkillData()}
                                onClick={()=>EditSkillData()}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )

}

export default editSkills;