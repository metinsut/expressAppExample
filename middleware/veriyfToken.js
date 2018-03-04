const jwt = require("jsonwebtoken");
const key = require("../helpers/apiSecretKey");


const verifyToken = (req, res, next) => {
      const token = req.headers["x-access-token"] || req.body.token || req.query.token

      if(token) {
            jwt.verify(token, key.api_secret_key, (err,decoded) => {
                  if(err) {
                        res.json({
                              status:false,
                              message:"Failed to authenticate token."
                        })
                  }
                  else {
                        req.decode = decoded;
                        next();
                  }
            })
      }
      else {
            res.json({
                  status:false,
                  message:"No token provided"
            })
      }
};

module.exports = verifyToken;
