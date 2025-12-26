const express=require("express");
const router=express.Router()
const upload=require("../middleware/multer");
const {cartGet,cartAdd,cartUpdate,cartDelete}=require("../controllers/cartController");

router.get("/cartsGet",cartGet);
router.post("/cartPost",upload.single("image") ,cartAdd);
router.put("/cartPut/:id",upload.single("image") ,cartUpdate);
router.delete("/cartDelete/:id",upload.single("image") ,cartDelete);

module.exports=router;
