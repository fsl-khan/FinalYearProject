import { useContext, useState } from "react"
import Posts from "../Posts/Posts"
import Stories from "../Storiess/Stories"
import Share from "../Upload/Share"
import "./Feed.scss"
import { AuthContext } from "../../Context/authContext"
import axios from "axios"
import { Backdrop, Box, Button, Fade, Modal, TextareaAutosize } from "@mui/material";
import React from "react"

const Feed = () => {
  const { currentUser } = useContext(AuthContext)
  const [data, setData] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRequest =  async() => {
    try {
      await axios.post('http://localhost:8800/api/users/sample', {
        id: currentUser.id,
        sample: data
      });
      handleClose();
    } catch (error) {
      console.log(error)
    }
  };
 
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
  return (
    <div className="Feeds">
      {parseInt(currentUser.usertype, 10) !== 0 && (
        <div className="shareContent">
          <Share />
        </div>
      )}
      <div className="postContent">
        {currentUser.usertype === "1" ? "" :
        <div className="request" onClick={handleOpen} >
          <h2>Request a Poet Account</h2>
        </div>
        }
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
           <TextareaAutosize value={data} onChange={(e)=>setData(e.target.value)}/>
            <Button onClick={handleRequest} >Submit</Button>
          </Box>
        </Fade>
      </Modal>
        <Posts />
      </div>
    </div>
  )
}

export default Feed