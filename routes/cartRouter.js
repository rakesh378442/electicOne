const express = require("express");
const {
  cartGet,
  cartAdd,
  cartUpdate,
  cartDelete,
} = require("./cart.controller");

const router = express.Router();

router.get("/", cartGet);
router.post("/", cartAdd);
router.put("/:id", cartUpdate);
router.delete("/:id", cartDelete);

module.exports = router;
