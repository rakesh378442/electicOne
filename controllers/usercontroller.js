const database=require("../db");
 const userget=async(req,res)=>{
    try{
        const [users]=await database.query("SELECT * FROM users");
        res.status(200).json(users);

    }
    catch(error){
        res.status(500).json({message:"database fathing error"+error

        });


    }
 }

const useradd=async(req,rs)=>{
    

}

const userAdd=async(req,res)=>{
    try{
        const {name,age,address}=req.body;
        const image=req.file ? req.file.filename : null;
        const [result]=await database.query("INSERT INTO users (name,age,address,image) VALUES (?,?,?,?)",[name,age,address,image]);
        res.status(201).json({
            message:"User added successfully",
             userId: result.insertId,
             image: image,
    });


    }
    catch(error){        
        res.status(500).json({message:"database insertion error"+error});


}}

 module.exports={userget,userAdd};