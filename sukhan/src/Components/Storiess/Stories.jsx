import { AuthContext } from "../../Context/authContext"
import { useContext } from "react"
import "./Stories.scss"

const Stories = () => {

    const {currentUser} = useContext(AuthContext) 

    const stories = [
        {
            id: 1,
            name: "John Doe",
            img: "/images/pic3.jpg"
        },
        // {
        //     id: 2,
        //     name: "John Doe",
        //     img: "/images/pic4.png"
        // },
        // {
        //     id: 3,
        //     name: "John Doe",
        //     img: "/images/pic3.jpg"
        // },
        // {
        //     id: 4,
        //     name: "John Doe",
        //     img: "/images/bg9.png"
        // },
        // {
        //     id: 5,
        //     name: "John Doe",
        //     img: "/images/pic1.png"
        // },
        // {
        //     id: 6,
        //     name: "John Doe",
        //     img: "/images/pic7.png"
        // },
        // {
        //     id: 8,
        //     name: "John Doe",
        //     img: "/images/pic1.png"
        // },
        // {
        //     id: 9,
        //     name: "John Doe",
        //     img: "/images/pic2.png"
        // },
        // {
        //     id: 10,
        //     name: "John Doe",
        //     img: "/images/pic3.jpg"
        // },
    ]
    
  return (
    <div className='Stories'>
        <div className="storiesContainer">
        <div className="story">
                    <img src={"./upload/"+currentUser.profilepic }  alt="null" />
                    {console.log(currentUser)}
                    <span>{currentUser.username}</span>
                <button>+</button>
            </div>  
            {stories.map(story=>(
                <div className="story" key={story.id}>
                    <img src={story.img} alt="" />
                    <span>{story.name}</span>
                </div>
            ))}
            </div>
    </div>
  )
}

export default Stories
