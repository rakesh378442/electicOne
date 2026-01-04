const express = require("express");
const router = express.Router();

const {
  plaseOrderAddressGet,
  placeOrderAddressAdd,
  placeOrderAddressPatch
} = require("../controllers/placeOrderAddressController");

router.get("/address/:id", plaseOrderAddressGet);
router.post("/address", placeOrderAddressAdd);
router.patch("/address/:id", placeOrderAddressPatch);

module.exports = router;
