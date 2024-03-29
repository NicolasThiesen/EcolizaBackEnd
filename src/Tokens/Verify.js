const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){
    const token = req.header("adm-token");
    if(!token) return res.status(401).send("Acces Denied");
    
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.adm = verified;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}