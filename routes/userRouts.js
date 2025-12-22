const express=require("express");
const router=express.Router();
const uploded=require("../middleware/multer");
const{userget,userAdd}=require("../controllers/usercontroller")
router.get("/detels",userget);
router.post("/add",uploded.single("image"),userAdd);

module.exports=router;
