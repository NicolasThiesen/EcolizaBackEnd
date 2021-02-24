const monngoose = require("mongoose");
const bcrypt =  require("bcryptjs");
const Admin = monngoose.model("Admin");
const jwt = require("jsonwebtoken");

module.exports = {
    async store(req,res){
        const admin = await Admin.create(req.body); 
        return res.json(admin);
    },
    async login(req,res){ 
        // check the usename
        const admin  = await Admin.findOne({username: req.body.username});
        if(!admin) return res.status(400).json({"error":"Login ou senha incorreto."})
            //check the password
            const pass = await bcrypt.compare(req.body.password,admin.password)
            if(!pass) return res.status(400).json({"error":"Login ou senha incorreto."})

        //Create and assign a token
        const token = jwt.sign({_id:admin.id}, process.env.TOKEN_SECRET, {expiresIn:"1h"});
        res.header("adm-token",token).send(token);
    },
    async update(req,res){
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(req.params.password, salt)
        const admin = await Admin.findOneAndUpdate({username: req.params.user}, {password: hashedPassword},{new:true});;
        return res.json({mensagem:"Admin foi atualizado com sucesso.",content:admin});
    },
    
};