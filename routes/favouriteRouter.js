const express = require("express");
const router = express.Router();

const {
  favouriteAdd,
  favouriteDelete,
  favouriteGet,
  favouriteGests
} = require("../controllers/favouriteController");

router.post("/", favouriteAdd);        
router.delete("/:id", favouriteDelete); 
router.get("/:id", favouriteGet);       
router.get("/", favouriteGests);        

module.exports = router;
