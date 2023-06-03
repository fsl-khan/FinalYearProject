import React, { useMemo, useState } from 'react'
import  PropTypes  from 'prop-types';
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import "./Rate.scss";

function Rate ({count, rating, color, onRating})  {

    const [hoverRating, setHoverRating] = useState(0);
    const getColor = index => {
        if (hoverRating >= index ){
            return color.filled;
        }
        else if (!hoverRating && rating >= index){
            return color.filled
        }
        return color.unfilled;
    }
    const starRating = useMemo(()=>{
        return Array(count)
            .fill(0)
            .map((_, i)=>i+1)
            .map(idx=>
                <StarOutlinedIcon
                    key={idx}
                    className="iconStar"
                    icon="star"
                    onClick={()=>onRating(idx)}
                    style={{color: getColor(idx)}}
                    onMouseEnter={() => setHoverRating(idx)}
                    onMouseLeave={() => setHoverRating(0)}
                />
            );
    },[count, rating, hoverRating] );

  return (
    <div>
      {starRating}
    </div>
  )
}
Rate.propTypes = {
    count: PropTypes.number,
    rating: PropTypes.number,
    onchange: PropTypes.number,
    color: PropTypes.shape({
        filled: PropTypes.string,
        unfilled: PropTypes.string
    }).isRequired
};
Rate.defaultProps = {
    count : 5,
    rating : 0,
    color: {
        filled: "#f5eb3b",
        unfilled: "#DCDCDC"
    }
}

export default Rate
