import { Container, Box, Grid, IconButton, Typography, TextField, Button, MenuItem, Select, Table, TableRow, TableCell, Divider, TableBody,FormControl, RadioGroup, FormControlLabel, Radio  } from "@material-ui/core";
import React from "react";
import axios from 'axios'
import {AddBox, Delete as Close }from "@material-ui/icons";

const addFeedback = (props)  => {
    const [skills, setSkills] = React.useState([])
    const [user, setUser] = React.useState([])
    const [inputValue, setInputValue] = React.useState([])
    const [feedback, setFeedback] = React.useState([]);
    const [rating, setRating] = React.useState('');
    const [technical_skill, setTechnicalSkill] = React.useState('');
    const [comment, setComment] = React.useState('');
    const [weightage, setWeightage] = React.useState('');
    const [otherAttributes, setOtherAttributes] = React.useState([]);
    const [otherRating, setOtherRating] = React.useState('');
    const [otherSkill, setOtherSkill] = React.useState('');
    const [otherComment, setOtherComment] = React.useState('');
    const [otherInput, setOtherInput] = React.useState([]);
    const [optRadio, setOptRadio] = React.useState('');
    const [overallFeedback, setOverallFeedback] = React.useState('');



    const id = props.location.id
    const level = props.location.level

    if(id === undefined && level === undefined)
    {
        window.location = '/feedback'
    }

  console.log(level)
    React.useEffect(() => {
      axios({
        method: 'get',
        url: 'http://localhost:8080/candidate/update/'+id,
      })
        .then((response) => {

            setUser(response.data); 
            console.log(response.data); 
            axios({
                method: 'post',
                url: 'http://localhost:8080/skill/getSkills/',
                data: {
                    skill_name: response.data.position_applied
                }
              })
                .then((response) => {
        
                    setSkills(response.data.sub_skill_name); 
                    console.log(response.data);   
            });  
    });    
  },[]);

    function addItem() {
    if (inputValue) {
        console.log(inputValue)
        setFeedback(feedback, feedback.push(inputValue.Feedback));
        setComment('');
        setRating('');
        setTechnicalSkill('')
        setWeightage('')
        setInputValue('') 
      console.log('I want',feedback)
    } else alert("Kindly enter the project ID");
  }
  function addAttributes() {
    if (otherInput) {
        console.log(otherInput)
        setOtherAttributes(otherAttributes, otherAttributes.push(otherInput.otherAttributes));
        setOtherComment('');
        setOtherRating('');
        setOtherSkill('');
        setOtherInput('');
      console.log('I want',otherAttributes)
    } else alert("Kindly enter the project ID");
  }

  const deleteItem = (e) => {
    const name = e;
    setFeedback(
      feedback.filter(function (item) {
        return item !== name;
      })
    )}
    const  deleteOtherItem = (e) => {
        const name = e;
        setOtherAttributes(
          otherAttributes.filter(function (item) {
            return item !== name;
          })
        )}
    const submitFeedback = () => {
        console.log(optRadio, overallFeedback, otherAttributes, feedback)

        axios({
            method:'post',
            url :'http://localhost:8080/feedback/'+level+'/'+id,
            data:{
                skills: feedback,
                attribute: otherAttributes,
                overallFeedback : overallFeedback,
                optRadio: optRadio
            }
        }).then((response) =>{
                console.log(response)
                if(response.status === 200)
                {
                    window.location = '/feedback'
                }
        })
    }
    const downloadFeedback = () => {
        console.log(optRadio, overallFeedback, otherAttributes, feedback)

        axios({
            method:'get',
            url :'http://localhost:8080/feedback/download/'+level+'/'+id,
        }).then((response) =>{
                console.log(response)
                if(response.status === 200)
                {
                    console.log("Feedback Downloaded ");
                }
        })
    }
  console.log(inputValue)
    return(
        <div>
            <Container>
                <Typography variant="h4" align="left" style={{fontWeight: '600'}}> Add Feedback</Typography>
                <Box>
                <Table>
                    <TableBody>
                            <TableRow>  
                                <TableCell>Candidate Name</TableCell>
                                <TableCell>{user.candidate_name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Position Appplied For</TableCell>
                                <TableCell>{user.position_applied}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Experience Level</TableCell>
                                <TableCell>{user.experience_level}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Contact Number</TableCell>
                                <TableCell>{user.contact_no}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Address</TableCell>
                                <TableCell>{user.address}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
                <Divider/>
                <Box>
                    <Grid container  spacing={2}>
                        <Grid item xs={12}> 
                            <Typography variant="h6"> {level} Evaluation Form</Typography>
                            <Typography variant="caption">(Rating Criteria: 5 - Excelent, 4 - Good, 3- Fair, 2 - Average, 1 - Poor)</Typography>
                            <Divider/>
                        </Grid>   
                        <Grid item xs={3}>
                            <Typography variant="caption">Technical Skills</Typography><br/>
                            <Select
                                //select
                                type='text'
                                variant="outlined"
                                name='technical_skill'
                                style={{width:'100%'}}
                                value={technical_skill}
                                onChange={(e) => { setInputValue(inputValue => ({
                                    ...inputValue,
                                    Feedback :{ ...inputValue.Feedback, technical_skill: e.target.value }
                                    
                                }) , setTechnicalSkill(e.target.value))}}
                            >
                                <MenuItem value=''>None</MenuItem>
                                {console.log(skills)}
                                {skills.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={2}>
                        <Typography variant="caption">Rating</Typography><br/>

                            <Select
                                
                                variant="outlined"
                                name='rating'
                                value={rating}
                                style={{width:'100%'}}
                                onChange={(e) => { setInputValue( inputValue => ({
                                    ...inputValue,
                                    Feedback :{ ...inputValue.Feedback, rating: e.target.value }
                                    
                                }) , setRating(e.target.value))}}
                            >
                                <MenuItem key={1} value="1">1</MenuItem>
                                <MenuItem key={2} value="2">2</MenuItem>
                                <MenuItem key={3} value="3">3</MenuItem>
                                <MenuItem key={4} value="4">4</MenuItem>
                                <MenuItem key={5} value="5">5</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={2}>
                        <Typography variant="caption">Weightage</Typography><br/>

                            <TextField
                                type='text'
                                variant="outlined"
                                name='Weightage'
                                value={weightage}
                                style={{width:'100%'}}

                                onChange={(e) => { setInputValue(inputValue => ({
                                    ...inputValue,
                                    Feedback :{ ...inputValue.Feedback, weightage: e.target.value }
                                    
                                }) , setWeightage(e.target.value))}}


                            />
                        </Grid>
                        <Grid item xs={3}>
                        <Typography variant="caption">Interviewer's Comment</Typography>

                            <TextField
                                type='text'
                                variant="outlined"
                                name='interviewers_Comment'
                                value={comment}
                                onChange={(e) => { setInputValue(inputValue => ({
                                    ...inputValue,
                                    Feedback :{ ...inputValue.Feedback, comment: e.target.value }
                                    
                                }) , setComment(e.target.value))}}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="caption">Add Feedack</Typography><br/>
                            <IconButton aria-label="Add" style={{color :'green'}} onClick={addItem} className="add">
                                <AddBox />
                            </IconButton>
                        </Grid>
                    </Grid>
                    {feedback !== null || feedback !== ''?
                    (<Grid container spacing = {2}>
                        <Table>
                            <TableBody>
                                
                                {feedback.map((item) => {
                                    return (
                                    <TableRow>
                                        
                                            <TableCell>{item.technical_skill}</TableCell>
                                       
                                        
                                            <TableCell>{item.rating}</TableCell>
                                       
                                    
                                            <TableCell>{item.weightage}</TableCell>
                                       
                                    
                                            <TableCell>{item.comment}</TableCell>
                                       
                                    
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="white"
                                                    // className = {classes.selectedButton}
                                                    onClick={(e) => {
                                                    deleteItem(item);
                                                    }}
                                                >       
                                                    <Close  style={{color:'red', backgroundColor:'white'}}/>
                                                    
                                                </Button>    
                                            </TableCell>
                                       
                                    </TableRow>
                                                 

                                )})}
                            </TableBody>
                        </Table>
                    </Grid>): ''}
                </Box>
                <Grid container  spacing={2}>
                    <Grid item xs={3}>
                        <Typography variant="caption">Other Skills</Typography><br/>
                        <TextField
                            type='text'
                            variant="outlined"
                            name='otherSkill'
                            value={otherSkill}
                            style={{width:'100%'}}

                            onChange={(e) => { setOtherInput(attributes => ({
                                ...attributes,
                                otherAttributes :{ ...attributes.otherAttributes, otherSkill: e.target.value }
                                
                            }) , setOtherSkill(e.target.value))}}
                        />
                    </Grid>   
                    <Grid item xs={3}>
                        <Typography variant="caption">Rating</Typography><br/>

                            <Select
                                
                                variant="outlined"
                                name='otherRating'
                                value={otherRating}
                                style={{width:'100%'}}
                                onChange={(e) => { setOtherInput( attributes => ({
                                    ...attributes,
                                    otherAttributes :{ ...attributes.otherAttributes, otherRating: e.target.value }
                                    
                                }) , setOtherRating(e.target.value))}}
                            >
                                <MenuItem key={1} value="1">1</MenuItem>
                                <MenuItem key={2} value="2">2</MenuItem>
                                <MenuItem key={3} value="3">3</MenuItem>
                                <MenuItem key={4} value="4">4</MenuItem>
                                <MenuItem key={5} value="5">5</MenuItem>
                            </Select>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="caption">Interviewer's Comment</Typography>

                            <TextField
                                type='text'
                                variant="outlined"
                                name='otherComment'
                                value={otherComment}
                                onChange={(e) => { setOtherInput(attributes => ({
                                    ...attributes,
                                    otherAttributes :{ ...attributes.otherAttributes, otherComment: e.target.value }
                                    
                                }) , setOtherComment(e.target.value))}}
                            />
                    </Grid>   
                    <Grid item xs={3}>
                            <Typography variant="caption">Add Feedack</Typography><br/>
                            <IconButton aria-label="Add" style={{color :'green'}} onClick={addAttributes} className="add">
                                <AddBox />
                            </IconButton>
                        </Grid>

                    {otherAttributes? (
                        <Grid container>
                            <Table>
                                <TableBody>

                                
                            {otherAttributes.map((item) =>{
                                return(
                                    <TableRow>
                                        <TableCell>
                                         {item.otherSkill}
                                        </TableCell>
                                        <TableCell>
                                            {item.otherRating}
                                        </TableCell>
                                        <TableCell>
                                        {item.otherComment}

                                        </TableCell>
                                        <TableCell>
                                                <Button
                                                    variant="contained"
                                                    
                                                    // className = {classes.selectedButton}
                                                    onClick={(e) => {
                                                    deleteOtherItem(item);
                                                    }}
                                                >       
                                                    <Close  style={{color:'red', backgroundColor:'white'}}/>
                                                    
                                                </Button>    
                                            </TableCell>
                                    </TableRow>
                                )
                            })}
                            </TableBody>
                            </Table>
                        </Grid>

                    ): null}
                    <Grid item xs={12}>
                    <Typography variant="caption">Overall Feedback</Typography><br/>
                        <TextField
                        name='finalComment'
                        fullWidth
                        value={overallFeedback}
                        variant="outlined"
                        onChange={(e) => setOverallFeedback(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl>
                    <Typography variant="caption">Final Result</Typography><br/>

                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="0"
                            name="radio-buttons-group"
                            value={optRadio}
                            onChange={(e)=> setOptRadio(e.target.value)}
                        >
                            <FormControlLabel value="0" control={<Radio color="primary" />} label="No Go" />
                            <FormControlLabel value="1" control={<Radio color="primary" />} label="Next" />
                            <FormControlLabel value="2" control={<Radio color="primary" />} label="On Hold" />
                        </RadioGroup>
                        </FormControl>
                    </Grid> 
                    <Grid item xs={12}>
                            <Button 
                                variant='contained' 
                                type='submit' 
                                color='primary'
                                style={{margin: 10}}
                                onSubmit={() => submitFeedback()}
                                onClick={() => submitFeedback()}
                            >
                                Submit
                            </Button>
                            <Button 
                                variant='contained' 
                                type='submit' 
                                color='primary'
                                style={{margin: 10}}
                                onClick={() => downloadFeedback()}
                            >
                                Download
                            </Button>
                    </Grid>                               
                </Grid>
            </Container>
        </div>
    )
}

export default addFeedback;