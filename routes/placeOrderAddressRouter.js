const express = require("express");
const router = express.Router();

const {
  plaseOrderAddressGet,
  placeOrderAddressAdd,
  placeOrderAddressUpdate
} = require("../controllers/placeOrderAddressController");

router.get("/address/:id", plaseOrderAddressGet);
router.post("/address", placeOrderAddressAdd);
router.patch("/address/:id", placeOrderAddressUpdate);

module.exports = router;
