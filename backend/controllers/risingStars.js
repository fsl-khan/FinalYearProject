import {db} from "../connect.js";

export const rising = (req, res) => {
    const q = "SELECT username, profilepic FROM users";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
};
