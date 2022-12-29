import  React from "react";
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import axios from 'axios'
import { Container, Table, TableCell, TableHead, Typography, Grid,InputBase, Box, Backdrop, CircularProgress , Button,alpha, makeStyles, TableBody} from '@material-ui/core'
import { Link } from 'react-router-dom';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

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
        display: 'table-caption',
        marginTop: '10%'

    },
    Grid:{
        margin: '4% 0'
        
    },
    Box: {
        display:'flex',
    },
    addCandidate:{
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
        backgroundColor:'white',
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
        textAlign: 'left',
        fontWeight: 'bold'
    },
    tableRow :{
        textAlign: 'left',
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
//sorting
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const classes = candidateStyle();
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        
          <TableCell
            className={classes.tableHeading}
            key={'candidate_name'}
            sortDirection={orderBy === 'candidate_name' ? order : false}
          >
            <TableSortLabel
              active={orderBy === 'candidate_name'}
              direction={orderBy === 'candidate_name' ? order : 'asc'}
              onClick={createSortHandler('candidate_name')}
            >
              Name
              {orderBy === 'candidate_name' ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
          <TableCell
            className={classes.tableHeading}
            key={'position_applied'}
            sortDirection={orderBy === 'position_applied' ? order : false}
          >
            <TableSortLabel
              active={orderBy === 'position_applied'}
              direction={orderBy === 'position_applied' ? order : 'asc'}
              onClick={createSortHandler('position_applied')}
            >
              Position Applied
              {orderBy === 'position_applied' ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
          <TableCell
            className={classes.tableHeading}
            key={'experience_level'}
            sortDirection={orderBy === 'experience_level' ? order : false}
          >
            <TableSortLabel
              active={orderBy === 'experience_level'}
              direction={orderBy === 'experience_level' ? order : 'asc'}
              onClick={createSortHandler('experience_level')}
            >
              Experience Level
              {orderBy === 'experience_level' ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
          <TableCell
            className={classes.tableHeading}
            key={'address'}
            sortDirection={orderBy === 'address' ? order : false}
          >
            <TableSortLabel
              active={orderBy === 'address'}
              direction={orderBy === 'address' ? order : 'asc'}
              onClick={createSortHandler('address')}
            >
              Address
              {orderBy === 'address' ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.tableHeading}>
            Action
          </TableCell>
        
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function Candidate () {

    const classes = candidateStyle();
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState('');
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

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
            url: 'http://localhost:8080/candidates',
          })
            .then(  (response) => {
                console.log(response)
                
                setTimeout( ()=> {setOpen(false)}, 500);
                setData(response.data);
                console.log(response.data)
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

    const  deleteUser = (candidateid) => {
        console.log(candidateid)
        setOpen(true);
        axios({
            method: 'get',
            url: 'http://localhost:8080/candidate/delete/'+candidateid,
        }).then((response) =>{
            setTimeout( ()=> {setOpen(false)}, 1000);
            window.location ='/';
            console.log(response.status);
        })
    }    
    
    return(
        <div  className={classes.root}>
            <Container>
                <Typography  className={classes.Heading}>Candidates</Typography>
                <Grid container item xs={12} className={classes.Grid}>
                    <Grid item xs ={6} >
                    <Box className={classes.Box}>
                        <Button component={Link} to="/candidates/add" variant="outlined" color="primary" className={classes.addCandidate}> + Add Candidates</Button>
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
                    {/* <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeading}>Name</TableCell>
                            <TableCell className={classes.tableHeading}>Position</TableCell>
                            <TableCell className={classes.tableHeading}>Experience (years)</TableCell>
                            <TableCell className={classes.tableHeading}>Location</TableCell>
                            <TableCell className={classes.tableHeading}>Action</TableCell>
                        </TableRow>
                    </TableHead> */}
                    <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={filterdata.length}
                    />
                    <TableBody>
                        
                        {(rowsPerPage > 0
                        ? stableSort(filterdata, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : filterdata).map((item) => {
                            return(
                                <TableRow key={item._id}>
                                <TableCell className={classes.tableRow}>{item.candidate_name}</TableCell>
                                <TableCell className={classes.tableRow}>{item.position_applied}</TableCell>
                                <TableCell className={classes.tableRow}>{item.experience_level}</TableCell>
                                <TableCell className={classes.tableRow}>{item.address}</TableCell>
                                <TableCell className={classes.tableRow}>
                                    {/* <Button component={Link} to={"/candidate/update/"+item._id} variant="outlined" color="primary" className={classes.Button} onClick= {() => updateUser(item._id)}>edit</Button> */}
                                    <Link  
                                        className={classes.editLinks} 
                                        to = {{
                                            pathname: "/candidate/update/",
                                            id: item._id
                                            }}
                                    >
                                        <Button variant="outlined" color="primary" className={classes.Button}>edit</Button>
                                    </Link>
                                <Button 
                                    variant="outlined" 
                                    color="secondary" 
                                    className={classes.Button}
                                    onClick= {() => deleteUser(item._id)}>Delete</Button></TableCell>
                            </TableRow>
                        )})}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={5} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                    <TableRow>
                        <TablePagination
                        
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={5}
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
                </Table>
                ): 
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

export default Candidate;