const express=require("express");
const router=express.Router();
const {plaseOrderAddressGet,placeOrderAddressAdd,placeOrderAddressUpdate}=require("../controllers/placeOrderAddressController");

router.get("/");
router.post("/add");
router.put("/put/:id");

module.exports=router;