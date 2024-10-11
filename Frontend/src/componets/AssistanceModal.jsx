import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useAuthStore} from "../stores/authStore.js";
import axios from "axios";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({mechId, garageName}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {user} = useAuthStore();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    handleOpen();
    try{
        await axios.post("http://localhost:3000/api/book", {
            mech_id: mechId, 
            user_id: user?._id
        });
    }catch(error){
        console.log("Cannot perform booking", error);
    }
  }
  return (
    <div>
      <Button onClick={handleSubmit} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Book</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Booked Assistance Successfully!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You will hear from <span className="font-semibold">{mechId} {garageName} {user?._id}</span> shortly, Please book multiple mechanics to get help immediatly
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
