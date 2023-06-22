const router=require("express").Router()
const dotenv=require('dotenv');
const stripe=require("stripe")(process.env.STRIPE_KEY);

router.post('/payment',(req,res)=>{
    stripe.charges.create(
        {
            source:req.body.tokenId,
            amount:req.body.amount,
            currency:"inr",
        },
        (stripeErr,stripeRes)=>{
            if(stripeErr){
                res.status(400).json(err)
            }
            else{
                res.status(200).json(stripeRes);
            }
        }
    )
})

module.exports=router;