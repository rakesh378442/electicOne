const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");
const { 
  productGet,
  productAdd,
  productUpdate,
  productDelete,
  productPatch
} = require("../controllers/productController");

router.get("/getProducts", productGet);
router.post("/addProduct", upload.single("image"), productAdd);
router.put("/updateProduct/:id", upload.single("image"), productUpdate);
router.patch("/patchProduct/:id", upload.single("image"), productPatch);
router.delete("/deleteProduct/:id", productDelete);

module.exports = router;
