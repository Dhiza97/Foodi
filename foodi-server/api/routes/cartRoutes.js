const express = require("express");
const cartController = require("../controllers/cartControllers");

const router = express.Router();

router.get("/", cartController.getCartByEmail);
router.post("/", cartController.addToCart);
router.delete("/:id", cartController.deleteCart);
router.put("/:id", cartController.updateCart);
router.get("/:id", cartController.getSingleCart);

module.exports = router;