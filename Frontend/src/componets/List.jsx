import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useContext, useEffect, useRef, useState} from 'react';
import ReactLoading from "react-loading";
import GlobalContext from '../contexts/GlobalContext';
import AssistanceModal from "../componets/AssistanceModal";

function createData(mechId, description) {
  return { mechId, description };
}

const List=()=>{
    const [loading, setLoading] = useState(true);
    const {list} = useContext(GlobalContext);
    const rows=useRef([]);
    // const handleClick=(e)=>{
    //   console.log(e.target.value);
    // }
    useEffect(()=>{
      if(list){
        rows.current=list.map((item)=>{
            return createData(item._id, item.properties.description);
        });
        setLoading(false);
      }
    }, [list]);
    
  return (
    <div className='h-screen w-screen flex flex-col justify-evenly items-center'>
      <h1 className='text-5xl font-bold'>List of Mechanics near your location</h1>
      <div className='drop-shadow-2xl'>
        {!loading?
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, maxWidth: 900 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Mech ID</TableCell>
                  <TableCell align="center">Mech Name</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.current.length>0?rows.current.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align='center' component="th" scope="row">
                      {index+1}
                    </TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">
                      {/* <button onClick={handleClick} value={row.mechId} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Book
                      </button> */}
                      <AssistanceModal mechId={row.mechId} garageName={row.description}>Book</AssistanceModal>
                    </TableCell>
                  </TableRow>
                )):''}
              </TableBody>
            </Table>
          </TableContainer>
        :<ReactLoading type="spin" color="black"/>}
      </div>
    </div>
  );
}

export default List;