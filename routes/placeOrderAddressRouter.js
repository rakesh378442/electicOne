const express = require("express");
const router = express.Router();

const {
  plaseOrderAddressGet,
  placeOrderAddressAdd,
  placeOrderAddressUpdate
} = require("../controllers/placeOrderAddressController");

router.get("/placeGet", plaseOrderAddressGet);
router.post("/add", placeOrderAddressAdd);
router.put("/put/:id", placeOrderAddressUpdate);

module.exports = router;
