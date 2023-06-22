const Product=require ('../models/product');
const { verifytokenandadmin } = require('./verifytoken');
const router=require('express').Router();


//POST 
router.post("/",verifytokenandadmin,async(req,res)=>{
    const newproduct=new Product(req.body);

    const savedproduct=await newproduct.save();
    try{
        res.status(200).json(savedproduct);
    }catch(err){
        res.status(400).json(err);
       
    }
})

//UPDATE
router.put("/:id",verifytokenandadmin,async(req,res)=>{
    try{
        const updatedproduct=await Product.findByIdAndUpdate(req.params.id,{
            $set:req.body,

        },{new:true});

        
        res.status(200).json(updatedproduct);
    }   
    catch(err){
        res.status(400).json(err);
    }
})

module.exports=router;

//delete

router.delete("/:id",verifytokenandadmin,async(req,res)=>{
    try{
        const deletedproduct=await Product.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedproduct);
    }
    catch(err){
        res.status(400).json(err)
    }
})

//GET PRODUCT BY ID

router.get("/find/:id",async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        res.status(200).json(product);
    }
    catch(err){
        res.status(400).json(err);
        
    }
})

//get all product 

router.get("/",async(req,res)=>{
    const qnew=req.query.new;
    const qcategory=req.query.category;
    try{
        let products;
        if(qnew){
            products=await Product.find().sort({createdAt:-1}).limit(5);
        }
        else if(qcategory){
            products=await Product.find({
                categories:{
                    $in:[qcategory],
                }
            })
        } 
        else{
            products=await Product.find();
        }
        res.status(200).json(products);
        
    }      
    catch(err){ 
        res.status(400).json(err)
       
    }
})