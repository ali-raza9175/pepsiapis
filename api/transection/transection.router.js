const {createTansection,deleteTransection,getByDate,getByRole,stockDetail,updateTransection } = require("./transection.controller");
const router = require("express").Router();

router.post("/", createTansection);
router.get("/byrole",  getByRole);
router.get("/bydate", getByDate);
router.get("/bydate", stockDetail);
router.patch("/", updateTransection);
router.delete("/", deleteTransection);


module.exports = router;