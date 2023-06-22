const { verifytoken, verifytokenandauth, verifytokenandadmin } = require("./verifytoken");
const CryptoJs=require('crypto-js');
const User = require("../models/User");
const { findById } = require("../models/User");
const router=require("express").Router()


//UPDATE
router.put('/:id',verifytokenandauth,async (req,res)=>{
    if(req.body.password){
        req.body.password=CryptoJS(req.body.password,process.env.PASS_SEC).toString();
    }
    try{
        const updateduser=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updateduser)
    }catch(err){
        res.status(400).json(err);
       
    }
} )
//DELETE
router.delete("/:id",verifytokenandauth,async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted!!");
    }catch(err){
        res.status(400).json(err)
    }
})
//GET USER
router.get("/find/:id",verifytokenandauth,async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        const {password,...others}=user._doc;
        res.status(200).json({...others});
    }catch(err){
        res.status(400).json(err)
        
    }
})

//GET ALL USER

router.get("/",verifytokenandadmin,async(req,res)=>{
    const query=req.query.new;
    try{    

        const user=query ? await User.find().sort({_id:-1}).limit(5) : await User.find(); 
        res.status(200).json(user);
    }catch(err){
        res.status(400).json(err)
    }
})


module.exports=router;