import "./LeftBar.scss"
// import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';



const LeftBar = () => {


  return (
    <div className='leftBar'>
      <div className="bookContainer">
        <div className="item">
              <span className="LeftTopTitle">BOOKS / مکتوبات  </span>
              <div className="user">
                  <div className="userinfo">
                  <img src='/images/pic1.png'/>
                    <span>Poet Name</span>
                  </div>
                  <div className="book">
                       <img src='/images/cover.png'/>
                  </div>
                </div>
                <hr/>
                <div className="user">
                  <div className="userinfo">
                  <img src='/images/pic1.png'/>
                    <span>Poet Name</span>
                  </div>
                  <div className="book">
                       <img src='/images/cover2.jpeg'/>
                  </div>
                </div>
                <hr />
                
        </div>

      </div>
    </div>
  )
}

export default LeftBar
