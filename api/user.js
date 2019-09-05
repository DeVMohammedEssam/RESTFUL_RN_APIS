const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { secretOrKey } = require("../config/keys");

/* 
@route:     /api/user/singup
@method:    POST
@access:    public
*/
router.post("/signup", (req, res) => {
  const { password, email } = req.body;
  User.findOne({ email }).then(user => {
    if (user) {
      res.status(409).json({ error: "user already exists" });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        const newUser = new User({
          email,
          password: hash
        });
        newUser
          .save()
          .then(userData => res.status(200).json({ success: true }))
          .catch(error => res.status(500).json({ error }));
      });
    }
  });
});

/* 
@route:     /api/user/login
@method:    POST
@access:    public
*/
router.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (!user) {
      res.status(404).json({ error: "email not found" });
    } else {
      bcrypt.compare(password, user.password, (error, success) => {
        if (error) res.status(500).json({ error });
        else if (!success)
          res.status(404).json({ error: "incorrect password" });
        else {
          jwt.sign(
            { email, id: user._id },
            secretOrKey,
            { expiresIn: "1d" },
            (error, token) => {
              if (error) {
                res.status(401).json({ error });
              } else {
                res.status(200).json({ token: "Bearer " + token });
              }
            }
          );
        }
      });
    }
  });
});

module.exports = router;
