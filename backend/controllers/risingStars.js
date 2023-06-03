import {db} from "../connect.js";

export const rising = (req, res) => {
    const q = "SELECT u.profilepic, u.username, COUNT(r.rating) AS ranking, SUM(r.rating) AS rated FROM ratings r JOIN posts p ON r.postid = p.id JOIN users u ON p.userid = u.id GROUP BY u.id ORDER BY rated DESC;";
    

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
};
export const rating = (req, res) => {
    const q = "SELECT id,postid, sum(rating) as rating FROM ratings group by postid;";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
};
export const updateRating = (req, res) => {
    const { userid, postid, rating } = req.body;
  
    // Check if the row exists based on userid and postid
    const checkQuery = "SELECT * FROM ratings WHERE userid = ? AND postid = ?";
    db.query(checkQuery, [userid, postid], (err, result) => {
      if (err) return res.status(500).json(err);
  
      if (result.length > 0) {
        // Row exists, update the rating
        const updateQuery = "UPDATE ratings SET rating = ? WHERE userid = ? AND postid = ?";
        db.query(updateQuery, [rating, userid, postid], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Rating updated!");
        });
      } else {
        // Row doesn't exist, insert the data
        const insertQuery = "INSERT INTO ratings (userid, postid, rating) VALUES (?, ?, ?)";
        db.query(insertQuery, [userid, postid, rating], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Data inserted!");
        });
      }
    });
  };
  

