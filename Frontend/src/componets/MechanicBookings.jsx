import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import ReactLoading from "react-loading";
import { useAuthStore } from '../stores/authStore.js';
import axios from 'axios';
import { toast } from 'react-toastify';

function createData(username, email, phone, booking_id, status) {
    return { username, email, phone, booking_id, status };
}

const List = () => {
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState(null);
    const { user } = useAuthStore();
    const [noOfRequests, setNoOfRequests] = useState(0);
    const getList = async () => {
        console.log(user?._id);
        const res = await axios.get(`http://localhost:3000/api/requests/${user?._id}`);
        console.log(res.data.data);
        let bookings = res.data.data.map((item) => {
            return createData(item.username, item.email, item.phone, item.booking_id, item.status);
        });
        setRows(bookings);
    }
    // useEffect(()=>{
    //     toast.success("New request found");
    // }, [rows.length]);
    useEffect(()=>{
        getList();
        setLoading(false);
        setNoOfRequests(rows?.length);
        if(rows){
            setNoOfRequests(rows.length);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            getList();
            if(noOfRequests<rows?.length){
                toast.success("New Request Found");
                setNoOfRequests(rows.length);
                console.log(noOfRequests);
            }
            setLoading(false);
            // Simulate status update
        }, 10000);
        return () => clearInterval(interval);    
    }, [user, rows]);

    const handleAccept = (e) => {
        console.log(e.target.value);
        const value = e.target.value;
        axios.patch("http://localhost:3000/api/booking/status", {'booking_id': value, 'status': 'Accepted'})
        .then((result)=>{
            console.log(result);
        })
    }
    const handleReject = (e) => {
        const value = e.target.value;
        axios.delete(`http://localhost:3000/api/booking/${value}`)
        .then((result)=>{
            console.log(result);
        })
    }
    return (
        <div className='flex flex-col justify-evenly items-center p-10 h-[70vh]'>
            <div className='flex flex-col items-center justify-evenly h-full bg-[#F5F7F8] p-10 rounded-lg'>
            <h1 className='text-5xl font-bold'>Recieved Requests</h1>
            <div className='drop-shadow-2xl max-h-[20%] min-h-[60%] overflow-scroll'>
                {!loading ?
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, maxWidth: 900 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>User Name</TableCell>
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">Phone Number</TableCell>
                                    <TableCell align="center">Accept/Reject</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows?.length > 0 ? rows.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align='center' component="th" scope="row">
                                            {row.username}
                                        </TableCell>
                                        <TableCell align="center">{row.email}</TableCell>
                                        <TableCell align="center">
                                            {row.phone}
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                row.status==='Pending'? 
                                                <div className='w-full flex justify-evenly'>
                                                <Button variant="outlined" value={row.booking_id} onClick={handleAccept}>Accept</Button>
                                                <Button variant="outlined" value={row.booking_id} onClick={handleReject}>Reject</Button>
                                                </div>
                                                :
                                                <span>N/A</span>
                                            }
                                        </TableCell>
                                    </TableRow>
                                )) : <TableRow><TableCell align='center' colSpan={4}><span className='font-semibold'>No Requests Yet ...</span></TableCell></TableRow>}
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