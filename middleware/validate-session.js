const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
    const token =req.headers.authorization;
    console.log('token -->', token);


    jwt.verify(token, 'Hello I am secret', (err, decodedToken) => {

    
    /*if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided"})
    } else{
        jwt.verify(token, "i_am_secret", (err, decodeToken) => {
            console.log('decodeToken -->', decodeToken);*/

                if (!err && decodeToken) {
                    User.findOne({ where: { id: decodeToken.id }})

                    .then(user => {
                        if(!user) throw err;
                        

                        req.user = user;
                        return next();
                    })
                    .catch(err => res.status(501).json({ error : err}))
                } else {
                    req.errors = err;
                    return res.status(500).json({ error: 'Not Authorized'});
                }
                });
            }
            
module.exports = validateSession;




      