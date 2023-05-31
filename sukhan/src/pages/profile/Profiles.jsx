import { Language,  } from "@mui/icons-material"
import Posts from "../../Components/Posts/Posts"
import "./Profiles.scss"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import { useLocation } from "react-router-dom"
import UserModal from "../../Components/userModal/UserModal"
import { useContext, useState } from "react"
import { AuthContext } from "../../Context/authContext"

function Profile  (){

  const {currentUser} = useContext(AuthContext);

  const [openUserModal, setOpenUserModal] = useState(false)
  const userid = parseInt(useLocation().pathname.split("/")[2])

  const { isLoading, error, data } = useQuery(["user"], () =>
  makeRequest.get("/users/find/"+userid).then((res) => {
    return res.data;
  })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (Following) => {
      if (Following) return makeRequest.delete("/relationships?userid="+ userid);
      return makeRequest.post("/relationships", {'userid':userid});
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationships"]);
      },
    }
  );

  const handleFollow = () => {

  mutation.mutate (relationshipData && relationshipData.includes(currentUser.id)); 
}
   

  const { isLoading :rIsLoading,  data : relationshipData } = useQuery(["relationships"], () =>
  makeRequest.get("/relationships?followeduserid="+userid).then((res) => {
   return res.data;
 })
 );
  return (
    <div className="mainProfile">
      {isLoading ? "Loading..." : <>
      <div className="profile">
      <div className="images" >
        <img src={data && "/upload/"+data.profilepic } alt="nahi hay" className="profilePic" />
        <img src={data && "/upload/"+data.coverpic } alt="nahi hay" className="coverPic" />
        </div>
          <div className="profileDetails">
                <div className="userInfo">
                  <div className="left">
                  <Language />
                  <Language />
                  <Language />
                  <Language />
                  <Language />
                  </div>
                  <div className="center">
                        <span>{data && data.nickname }</span>
                        <div className="info">

                          <div className="item">
                            <Language />
                            <span>{data && data.language }</span>
                          </div>
                          <div className="item">
                            <Language />
                            <span>{data && data.bio }</span>
                          </div>
                          <div className="item">
                            <Language />
                          </div>
                          { rIsLoading ? "loading" : userid === currentUser.id 
                          ?
                          (<button onClick={()=> setOpenUserModal(true)} >Update</button>)
                                :
                          <button onClick={handleFollow}>{ relationshipData && relationshipData.includes(currentUser.id) ? "Following" : "Follow"}</button>}
                          
                        </div>
                  </div>
                  <div className="right">
                  <Language />
                  <Language />
                  <Language />
                  <Language />
                  <Language />

                  </div>
                </div>
            
          </div>
        <Posts userid={userid} />

       {openUserModal && < UserModal setOpenUserModal={setOpenUserModal} user={data}/>} 
      </div>
      </>}
    </div>
  )
}

export default Profile