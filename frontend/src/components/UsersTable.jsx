import { Avatar, Box, Button, Chip, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, TableHead, TextField, Tooltip, Typography, styled, useTheme } from '@mui/material';
import {Stack,Table} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from 'react'
import TablePaginationActions from './datatable/TablePaginationActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';


  
  
  function createUsers(id, fullname, username, email, birthDay,roleString,isVerify,isBlocked) {
    return { id, fullname, username,email,birthDay,roleString,isVerify,isBlocked };
  }
  
  const users = [
    createUsers(1,'Huu Da', 'huudd', 'huudd@gmail.com','01-01-2001','Admin', true, false),
    createUsers(2,'Huu Da 1', 'huudd1', 'huudd1@gmail.com','01-01-2001','Admin', true, false),
    createUsers(3,'Huu Da 2', 'huudd2', 'huudd2@gmail.com','01-02-2001','Learner', true, false),
    createUsers(4,'Huu Da 3', 'huudd3', 'huudd3@gmail.com','01-03-2001','Learner', true, false),
    createUsers(5,'Huu Da 4', 'huudd4', 'huudd4@gmail.com','01-04-2001','Teacher', true, false),
    createUsers(6,'Huu Da 5', 'huudd5', 'huudd1@gmail.com','01-05-2001','Learner', true, false),
    createUsers(7,'Huu Da 6', 'huudd6', 'huudd2@gmail.com','01-06-2001','Learner', true, false),
    createUsers(8,'Huu Da 7', 'huudd7', 'huudd3@gmail.com','01-07-2001','Learner', true, false),
    // createUsers(9,'Huu Da 8', 'huudd8', 'huudd4@gmail.com','01-08-2001','Teacher', true, false),
  ]
  //.sort((a, b) => (a.calories < b.calories ? -1 : 1));
  

const UsersTable = () => {

    const [filter,setFilter] = React.useState("fullname");
    const [searchParam,setSearchParam] = React.useState("");

  // trang hien tai
    const [page, setPage] = React.useState(0);
  // so record trong 1 trang
    const [usersPerPage, setUsersPerPage] = React.useState(5);
    
    // Avoid a layout jump when reaching the last page with empty rows.
    // giu layout bang voi 
    const emptyRows = 
    page > 0 ? Math.max(0, (1 + page) * usersPerPage - users.length) : 0;

    // --------handle function
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    
      // xu ly thay doi so rows moi page
    const handleChangeRowsPerPage = (event) => {
      setUsersPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    //--------------------------Styled component--------------------------
    const StackActionTable = styled(Stack)({
      spacing:'1px',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
    })

  return (
    <>
      <Typography variant='h5'>User management</Typography>
      {/* Search user action */}
      <Stack flexDirection="row" sx={{ gap:"10px", float:'right', padding:'10px 0', margin:'10px 0' }}>
        <TextField placeholder='Search'/>
          <Select
            id="filter-select"
            value={filter}
            defaultValue="fullname"
            // label="Filter by"
            onChange={(e)=>{setFilter(e.target.value)}}
            sx={{width:"150px"}}
          >
            <MenuItem value='fullname'>Full name</MenuItem>
            <MenuItem value='username'>Username</MenuItem>
            <MenuItem value='email'>Email</MenuItem>
            <MenuItem value='birthday'>Birth day</MenuItem>
            <MenuItem value='role'>Role</MenuItem>
          </Select>
        <Button variant='contained'>Search</Button>
      </Stack>
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 500 }}>
        <TableHead>
              <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="left">Fullname</TableCell>
                  <TableCell align="left">UserName</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Birthday</TableCell>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {(usersPerPage > 0
              ? users.slice(page * usersPerPage, page * usersPerPage + usersPerPage)
              : users
            ).map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center">{user.id}</TableCell>
                <TableCell align="left">{user.fullname}</TableCell>
                <TableCell  align="left"><Avatar sx={{width:30, height:30,display:"inline-flex", mr:1}}>{(user.username.toUpperCase())[0]}</Avatar>{user.username}</TableCell>
                <TableCell  align="left">{user.email}</TableCell>
                <TableCell  align="left">{user.birthDay}</TableCell>
                <TableCell  align="left">{user.roleString}</TableCell>
                <TableCell  align="center">{user.isBlocked?
                  <Chip label="Blocked" color="error" variant="outlined" />
                  :<Chip label="Active" color="success" variant="outlined" />}</TableCell>
                
                <TableCell  align="center">
                  <StackActionTable>
                    <Tooltip title='Edit'>
                      <IconButton color="yellow"  
                        onClick={()=>{console.log(`${user.name} clicked`)}}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" 
                        mt={0}
                        onClick={()=>{console.log(`${user.name} clicked delete`)}}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Block">
                      <IconButton 
                        mt={0}
                        onClick={()=>{console.log(`${user.name} clicked delete`)}}
                      >
                        <BlockIcon color='success' />
                      </IconButton>
                    </Tooltip>
                  </StackActionTable>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 73 * emptyRows }}><TableCell colSpan={8} /></TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={8}
                count={users.length}
                rowsPerPage={usersPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={(subProps)=>{
                  return (<TablePaginationActions {...subProps} />)
              }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}

export default UsersTable