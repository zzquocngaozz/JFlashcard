import React, { useTransition } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
const UserTable = () => {

  const [tableUser,setTableUser] = React.useState(null);
  const [isPending,startTransition] = useTransition();

  console.log("run")
  
  const pasreDate = (dateString)=>{

    return dateString.split(" ")[0];
  }

  React.useEffect( ()=>{
    
        axios.get("http://localhost:8081/api/v1/user").then((response)=>{
          console.log(response.data)
          setTableUser(response.data);
        }).catch((error)=>{
          console.log('error ',error)
        })

  },[])

  return (
    <>
    {isPending?<div>is pending</div>:<div>done</div>}
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>User name</TableCell>
                        <TableCell align="right">Full name</TableCell>
                        <TableCell align="right">Birth date</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Phone</TableCell>
                        <TableCell align="right">Role</TableCell>
                    </TableRow>
                </TableHead>
            <TableBody>
            {tableUser?.map((user) => (
                <TableRow
                key={user.userId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{user.userName}</TableCell>
                  <TableCell align="right">{user.firstName +" "+user.lastName }</TableCell>
                  <TableCell align="right">{pasreDate(user.birth)}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.phone}</TableCell>
                  <TableCell align="right">{user.roleString}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  )
}

export default UserTable