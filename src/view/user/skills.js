import  React from "react";
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'
import { Container, Table, TableCell, TableHead, TableRow, Typography, Grid,InputBase, Box, Backdrop, CircularProgress , Button,alpha, makeStyles, TableBody} from '@material-ui/core'
import { Link } from 'react-router-dom';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import PropTypes from 'prop-types';
const skillsStyle = makeStyles(theme => ({
    root:{
        width:window.innerWidth-220,
        backgroundColor:"#f9f9f9",
        paddingLeft:'1%'
    },
    Heading:{
        fontSize: '30px',
        fontWeight: '600',
        margin:'0',
        display: 'table-caption',
        marginTop: '10%'

    },
    Grid:{
        margin: '4% 0'
        
    },
    Box: {
        display:'flex',
    },
    addSkills:{
        textTransform:'capitalize',
        fontWeight:'600',
        color:'#347bcc',
        backgroundColor:'white'
    },
    search: {
        position: 'absolute',
        border: '1px solid #d3d3d3',
        color: '#ededed',
        // display:'inline',
        borderRadius: theme.shape.borderRadius,
        backgroundColor:'white',
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color:'grey'
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
    },
    table:{
        backgroundColor:'white'
    },
    Button:{
        textTransform: 'capitalize',
        margin:'1px'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 10,
        color: '#fff',
      },
    tableHeading: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    tableRow :{
        textAlign: 'center',
    },
    editLinks:{
        textDecoration : 'none'
    }
}))

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

function Skills () {

    const classes = skillsStyle();
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState('');
    
    const handleSearch = (event) => {
      setSearch(event.target.value);
    };
    const filterdata = data.filter((item) => Object.keys(item).some(k =>
        String(item[k]).toLowerCase().includes(search.toLowerCase())
      ));

    React.useEffect(() => {
        setOpen(true)
          axios({
            method: 'get',
            url: 'http://localhost:8080/getSkills',
          })
            .then(  (response) => {
                console.log(response.status)

                setTimeout( ()=> {setOpen(false)}, 500);
                console.log(response.data)
                setData(response.data);
                
        });
    },[]);

    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
    const handleChangePage = (event, newPage) => {
        console.log('I am in page', newPage)
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const  deleteSkill = (skillId) => {
        console.log(skillId)
        setOpen(true);
        axios({
            method: 'get',
            url: 'http://localhost:8080/skill/delete/'+skillId,
        }).then((response) =>{
            setTimeout( ()=> {setOpen(false)}, 1000);
            window.location ='/skills';
            console.log(response.status);
        })
    }      
    console.log(data)
    return(
        <div  className={classes.root}>
            <Container>
                <Typography  className={classes.Heading}>Skills</Typography>
                <Grid container item xs={12} className={classes.Grid}>
                    <Grid item xs ={6} >
                    <Box className={classes.Box}>
                        <Button variant="outlined" color="primary" className={classes.addSkills} component = {Link} to="/skills/addSkills" > + Add Skills</Button>
                    </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={handleSearch}
                                />
                            </div>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container item xs={12}>
                { !open? 
                (<Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Skill Name</b></TableCell>
                            <TableCell><b>Sub Skill Name</b></TableCell>
                            <TableCell className={classes.tableHeading}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                        ? filterdata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : filterdata).map((item) => {
                            return(
                                <TableRow key={item._id}>
                                <TableCell >{item.skill_name}</TableCell>
                                <TableCell >{item.sub_skill_name+ ' '}</TableCell> 
                                <TableCell className={classes.tableRow}>
                                    <Link 
                                        className={classes.editLinks} 
                                        to = {{
                                                pathname: '/skills/editSkills',
                                                id: item._id
                                            }}
                                    >
                                        <Button variant="outlined" color="primary" className={classes.Button}>edit</Button>
                                    </Link>
                                    <Button 
                                    variant="outlined" 
                                    color="secondary" 
                                    className={classes.Button}
                                    onClick= {() => deleteSkill(item._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        )})}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                    <TableRow>
                        <TablePagination
                        
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: {
                            'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                        />
                        </TableRow>
                    </TableFooter>
                </Table>): 
                (<div>
                    <Backdrop className={classes.backdrop} open={open}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>)}
                </Grid>
            </Container>
        </div>
    )
}

export default Skills;