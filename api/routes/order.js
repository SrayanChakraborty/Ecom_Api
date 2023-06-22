const { verifytokenandadmin, verifytokenandauth } = require("./verifytoken");
const Order=require("../models/Order.js")
const router=require("express").Router();

//UPDATE

router.post("/",verifytokenandadmin,async(req,res)=>{
    router.put("/:id",verifytokenandauth,async(req,res)=>{
        try{
            const updatedorder=await Order.findByIdAndUpdate(req.params.id,{
                $set:req.body,
    
            },{new:true});
    
            
            res.status(200).json(updatedorder);
        }   
        catch(err){
            res.status(400).json(err);
        }
    })
})

//DELETE

router.delete("/:id",verifytokenandauth,async(req,res)=>{
    try{
        const deletedorder=await Order.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedorder);
    }
    catch(err){
        res.status(400).json(err)
    }
})

//GET USER ORDER

router.get("/find/:userId",verifytokenandauth,async(req,res)=>{
    try{
        const order=await Order.find ({userId:req.params.userId}); 
        res.status(200).json(order);
    }
    catch(err){
        res.status(400).json(err);
        
    }
}) 


//GET ALL ORDERS

router.get("/",verifytokenandadmin,async(req,res)=>{
    try{
        const order=await Order.find();
        res.status(200).json(order);
    }catch(err){
        res.status(400).json(err)
    }
})

module.exports=router;
