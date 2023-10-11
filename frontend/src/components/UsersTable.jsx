import { Avatar,  Button, Chip,  IconButton,  MenuItem, Select, TableHead, TextField, Tooltip, Typography, styled } from '@mui/material';
import {Stack,Table} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react'
import TablePaginationActions from './datatable/TablePaginationActions';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ROLE } from '../utils/constant';
import { parseBirth } from '../utils/datetimeCalc';
import { getColorFromEnum } from '../utils/colorGetter';

  
 
  

const UsersTable = ({data}) => {  

    const [users,setUsers] = useState(data);

    const [filter,setFilter] = useState(1);
    const [searchParam,setSearchParam] = useState("");


  // trang hien tai
    const [page, setPage] = React.useState(0);
  // so record trong 1 trang
    const [usersPerPage, setUsersPerPage] = React.useState(5);
    
    // Avoid a layout jump when reaching the last page with empty rows.
    // giu layout bang voi 
    const emptyRows = 
    page > 0 ? Math.max(0, (1 + page) * usersPerPage - users.length) : 0;

    // --------handle function

    function handleSearch(){
      console.log(data)
      setPage(0)
      let filterData = data.filter((user)=>user.userName.includes(searchParam))
      switch(filter){
        case 1:
            filterData = data.filter((user)=>(user.firstName+" "+user.lastName).includes(searchParam.trim()))
          break;
        case 2:
            filterData = data.filter((user)=>user.userName.includes(searchParam))
          break;
        case 3: 
            filterData = data.filter((user)=>user.email.includes(searchParam))
         break;
        case 4:
            filterData = data.filter((user)=>(ROLE[user.role]) === searchParam)
          break;
        default:
            console.log('noc out: line61')
          
      }
      setUsers(filterData)
    }



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
      <Typography variant='h5'>Quản lý người dùng</Typography>
      {/* Search user action */}
      <Stack flexDirection="row" sx={{ gap:"10px", float:'right', padding:'10px 0',height:65, margin:'10px 0' }}>
        <TextField placeholder='Tìm kiếm'
        sx={{"& input":{padding:"11px 14px"}}}
        value={searchParam}
        type="search"
        onChange={(e)=>{setSearchParam(e.target.value)}}
        />
          <Select
            id="filter-select"
            value={filter}
            defaultValue={1}
            // label="Filter by"
            onChange={(e)=>{setFilter(e.target.value)}}
            sx={{width:"150px"}}
          >
            <MenuItem value={1}>Họ và tên</MenuItem>
            <MenuItem value={2}>Tên tài khoản</MenuItem>
            <MenuItem value={3}>Email</MenuItem>
            <MenuItem value={4}>Loại tài khoản</MenuItem>
          </Select>
        <Button variant='contained' onClick ={()=>handleSearch()} startIcon={<SearchOutlinedIcon/>} >Tìm kiếm</Button>
      </Stack>
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 500 }}>
        <TableHead>
              <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="left">Họ và tên</TableCell>
                  <TableCell align="left">Tên tài khoản</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Ngày sinh</TableCell>
                  <TableCell align="left">Tài khoản</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                  <TableCell align="center">Action</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {(usersPerPage > 0
              ? users.slice(page * usersPerPage, page * usersPerPage + usersPerPage)
              : users
            ).map((user) => (
              <TableRow key={user.userId}>
                <TableCell align="center">{user.userId}</TableCell>
                <TableCell align="left">{user.firstName+" "+ user.lastName}</TableCell>
                <TableCell  align="left"><Avatar sx={{width:30, height:30,display:"inline-flex", mr:1, backgroundColor:`${getColorFromEnum(user.userName.charAt(0))}`}}>{(user.userName.toUpperCase())[0]}</Avatar>{user.userName}</TableCell>
                <TableCell  align="left">{user.email}</TableCell>
                <TableCell  align="left">{parseBirth(user.birth)}</TableCell>
                <TableCell  align="left">{ROLE[user.role]}</TableCell>
                <TableCell  align="center">{user.looked?
                  <Chip label="Blocked" color="error" variant="outlined" />
                  :<Chip label="Active" color="success" variant="outlined" />}</TableCell>
                
                <TableCell  align="center">
                  <StackActionTable>
                    <Tooltip title='Xem'>
                      <IconButton sx={{color:"#00d6ff"}}  
                        onClick={()=>{console.log(`${user.name} clicked`)}}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    {user.looked?
                      <Tooltip title="Mở khoá">
                        <IconButton 
                          mt={0}
                          onClick={()=>{console.log(`${user.id} clicked blocked`)}}
                        >
                          <LockOpenIcon color='success' />
                        </IconButton>
                      </Tooltip>
                    :
                      <Tooltip title="Khoá">
                        <IconButton 
                          mt={0}
                          onClick={()=>{console.log(`${user.id} clicked blocked`)}}
                        >
                          <LockOutlinedIcon color='error' />
                        </IconButton>
                      </Tooltip>
                    }
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