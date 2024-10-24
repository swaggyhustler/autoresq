import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import ReactLoading from "react-loading";
import { useAuthStore } from '../stores/authStore.js';
import axios from 'axios';

function createData(garage_name, mechanic_name, status ) {
    return { garage_name, mechanic_name, status };
}

const List = () => {
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState(null);
    const { user } = useAuthStore();
    const getList = async () => {
        const res = await axios.get(`backend/api/bookings/${user?._id}`);
        let bookings = res.data.data.map((item) => {
            return createData(item.garage_name, item.mechanic_name, item.status);
        });
        setRows(bookings);
    }

    useEffect(()=>{
        getList();
        setLoading(false);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            getList();
            setLoading(false);
            // Simulate status update
        }, 10000);

        return () => clearInterval(interval);
    }, [user, rows]);

    return (
        <div className='flex flex-col justify-evenly items-center p-10 h-[70vh]'>
            <div className='flex flex-col flex flex-col items-center justify-evenly h-full bg-[#F5F7F8] p-10 rounded-lg'>
            <h1 className='text-5xl font-bold'>Your Booked Mechanics</h1>
            <div className='drop-shadow-2xl max-h-[20%] min-h-[60%] overflow-scroll'>
                {!loading ?
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, maxWidth: 900 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>Mech ID</TableCell>
                                    <TableCell align="center">Garage Name</TableCell>
                                    <TableCell align="center">Mechanic Name</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows?.length > 0 ? rows.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align='center' component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="center">{row.garage_name}</TableCell>
                                        <TableCell align="center">
                                            {row.mechanic_name}
                                        </TableCell>
                                        <TableCell align="center"><span className='font-semibold'>{row.status}</span></TableCell>
                                    </TableRow>
                                )) : <TableRow><TableCell align='center' colSpan={4}><span className='font-semibold'>No Data to be Displayed</span></TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <ReactLoading type="spin" color="black" />}
            </div>
            </div>
        </div>
    );
}

export default List;