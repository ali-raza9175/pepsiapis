const {createInventory ,deleteInventory ,getInventories ,updateInventory ,getInventory  } = require("./inventory.controller");
const router = require("express").Router();

router.post("/", createInventory);
router.get("/",  getInventories);
router.get("/:id", getInventory);
router.patch("/", updateInventory);
router.delete("/", deleteInventory);


module.exports = router;