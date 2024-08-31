import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useContext} from 'react';
import GlobalContext from '../contexts/GlobalContext';

function createData(mechId, description, button) {
  return { mechId, description, button };
}

export default function List() {
    const {list} = useContext(GlobalContext);
    let rows;
    if(list){
        rows=list.map((item)=>{
            return createData(item.mechId, item.properties.description, '<button>Book</button>')
        });
    }
  return (
    <div className='h-screen w-screen flex flex-col justify-evenly items-center'>
      <h1 className='text-5xl font-bold'>List of Mechanics near your location</h1>
      <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, maxWidth: 1600 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Mech ID</TableCell>
                  <TableCell align="center">Mech Name</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align='center' component="th" scope="row">
                      {row.mechId}
                    </TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">
                      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Book
                      </button>
                    </TableCell>
                  </TableRow>
                )):''}
              </TableBody>
            </Table>
          </TableContainer>
      </div>
    </div>
  );
}