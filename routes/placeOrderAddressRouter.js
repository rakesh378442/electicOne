const express = require("express");
const router = express.Router();

const {
  plaseOrderAddressGet,
  placeOrderAddressAdd,
  placeOrderAddressUpdate
} = require("../controllers/placeOrderAddressController");

router.get("/address", plaseOrderAddressGet);
router.post("/address", placeOrderAddressAdd);
router.put("/address/:id", placeOrderAddressUpdate);

module.exports = router;
