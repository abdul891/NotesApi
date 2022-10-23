const notemodel = require('../models/notes');


const createnotes = async (req, res)=>{
    console.log(req.userid);

const {title, description} =req.body;

const newnotes = new notemodel(
    {
        title:title,
        description:description,
        userid:req.userid
    }
);
try{
    await newnotes.save();
    res.status(201).json({messsage:"Notes successful created"});
}
catch(err){
    console.log(err);
    res.status(500).json({messsage:"Somethiing went wrong"});
}
}
const updatenotes = async (req ,res)=>{
    const id = req.params.id;
    const {title, description} =req.body;
    const newnotes = {
        title:title,
        description:description,
        userid:req.userid
    }
    try{
        await notemodel.findByIdAndUpdate(id, newnotes, {new : true});
        res.status(200).json(newnotes);
    }
    catch(err){
        console.log(err);
        res.status(500).json({messsage:"Somethiing went wrong"});
    }
}
const deletenotes = async (req ,res)=>{
    const id = req.params.id;

try{
const note = await notemodel.findByIdAndRemove(id);
res.status(200).json(note);
}
catch(err){
    console.log(err);
    res.status(500).json({messsage:"Somethiing went wrong"});
}
}
const getnotes = async (req ,res)=>{
    try{
        const getnotes = await notemodel.find({userid:req.userid});
        res.status(200).json(getnotes);
    }
    catch(err){
        console.log(err);
        res.status(500).json({messsage:"Somethiing went wrong"});
    }
    
    
}
module.exports = {createnotes, updatenotes, deletenotes, getnotes};