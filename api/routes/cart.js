const Cart=require("../models/Cart.js");
const { verifytokenandauth, verifytokenandadmin } = require("./verifytoken");

const router=require("express").Router();


//UPDATE
router.put("/:id",verifytokenandauth,async(req,res)=>{
    try{
        const updatedcart=await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body,

        },{new:true});

        
        res.status(200).json(updatedcart);
    }   
    catch(err){
        res.status(400).json(err);
    }
})


//DELETE
router.delete("/:id",verifytokenandauth,async(req,res)=>{
    try{
        const deletedcart=await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedcart);
    }
    catch(err){
        res.status(400).json(err)
    }
})

//GET CART BY ID 
router.get("/find/:userId",verifytokenandauth,async(req,res)=>{
    try{
        const cart=await Cart.findOne({userId:req.params.userId}); 
        res.status(200).json(cart);
    }
    catch(err){
        res.status(400).json(err);
        
    }
}) 

//GET ALL CART
router.get("/",verifytokenandadmin,async(req,res)=>{
    try{
        const cart=await Cart.find();
        res.status(200).json(cart);
    }catch(err){
        res.status(400).json(err)
    }
})
 

module.exports=router;