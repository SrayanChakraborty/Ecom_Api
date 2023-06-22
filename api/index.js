const express=require('express') ;
const app=express();
const mongoose=require('mongoose'); 
const dotenv=require('dotenv');
const PORT=process.env.PORT || 5000;

const authRoute=require('./routes/auth.js');
const userRoute=require('./routes/user.js');
const productRoute=require("./routes/product.js");
const orderRoute=require("./models/order");


const cors=require('cors');

dotenv.config();
 

mongoose.connect(process.env.MONGO_URL);


app.use(express.json());
app.use(cors()); 

app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/product",productRoute);
app.use('/api/order',orderRoute);


app.listen(PORT,()=>{
    
})