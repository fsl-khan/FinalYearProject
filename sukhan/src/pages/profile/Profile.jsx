import { Language,  } from "@mui/icons-material"
import Posts from "../../Components/Posts/Posts"
import "./Profiles.scss"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import { useLocation } from "react-router-dom"
import UserModal from "../../Components/userModal/UserModal"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Context/authContext"
import axios from "axios"
import ShowPost from "../../Components/Post/ShowPost"

function Profile2  (){

  const {currentUser} = useContext(AuthContext);

  const [openUserModal, setOpenUserModal] = useState(false)
  const userid = parseInt(useLocation().pathname.split("/")[2])

  const { isLoading, error, data } = useQuery(["user"], () =>
  makeRequest.get("/users/find/"+userid).then((res) => {
    return res.data;
  })
  );
  const [datass, setData3] = useState();
  const { isLoading3, error3, data3 } = useQuery(["posts"], () =>
  makeRequest.get("/posts?userid=" + userid).then((res) => {
    console.log("datafrom", res.data)
    setData3(res.data)
    return res.data;
  })
  );
  useEffect(()=>{
    handleSearch();
    getUser();
  },[userid])

  
  const handleSearch = async () =>{
    try {
      // Make an API request to update the rating in the database
      await axios.post('http://localhost:8800/api/users/rankUser', {
        "id": userid ,
  
      });
    } catch (error) {
      console.error('Error updating rating in the database:', error);
      // Handle the error and provide user feedback
    }
  }
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
  //  show post start

const [data1, setData] = useState();
// const [data3, setData3] = useState();

const getUser = async () => {
  try {
    const response1 = await axios.get("http://localhost:8800/api/rising/rate");
    const data1 = response1.data;
    setData(data1);

    // const response2 = await axios.get("http://localhost:8800/api/posts?userid=" + userid);
    // const data2 = response2.data;
    // setData3(data2);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    // Handle the error appropriately (e.g., show an error message to the user)
  }
};



console.log("ss",data1)
  // show post end

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
                  {/* <Language />
                  <Language />
                  <Language />
                  <Language />
                  <Language /> */}
                  </div>
                  <div className="center">
                        <span>{data && data.nickname }</span>
                        <div className="info">

                          <div className="item">
                            <span>{data && data.language }</span>
                          </div>
                          <div className="item">
                            <span>{data && data.bio }</span>
                          </div>
                          <div className="item">
                          </div>
                          { rIsLoading ? "loading" : userid === currentUser.id 
                          ?
                          (<button onClick={()=> setOpenUserModal(true)} >Update</button>)
                                :
                          <button onClick={handleFollow}>{ relationshipData && relationshipData.includes(currentUser.id) ? "Following" : "Follow"}</button>}
                          
                        </div>
                  </div>
                  <div className="right">
                  {/* <Language />
                  <Language />
                  <Language />
                  <Language />
                  <Language /> */}

                  </div>
                </div>
            
          </div>
          {datass && data1 && datass.map((post) => (
          <ShowPost
            post={post}
            key={post.id}
            rated={data1.find((item) => item.postid === post.id)?.rating || 0}
          />
        ))}

       {openUserModal && < UserModal setOpenUserModal={setOpenUserModal} user={data}/>} 
      </div>
      </>}
    </div>
  )
}

export default Profile2