const monngoose = require("mongoose");
const Ponto = monngoose.model("Ponto");

module.exports = {
    async index(req,res){
        const pontos = await Ponto.find();

        return res.json(pontos);
    },
    async show(req,res){
        const ponto  = await Ponto.find({name: {$regex:req.params.name, $options:"i"}});
        
        if(!ponto) return res.status(204).send("Ponto não encontrado")

        return res.json(ponto);
    },
    async store(req,res){
        const ponto = await Ponto.create(req.body); 
        return res.json(ponto);
    },
    async update(req,res){
        const ponto = await Ponto.findByIdAndUpdate(req.params.id,req.body, {new:true});
        return res.json({mensagem:"Ponto foi atualizado com sucesso."});
    },
    async desdroy(req,res){
        await Ponto.findByIdAndRemove(req.params.id);
        return res.json({Mensagem:"Ponto removido com sucesso."})
    }
    
};