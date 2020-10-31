const {createAccountancy,deleteAccountancy,getAccountancy,getbyDateAccountancy,updateAccountancy,getAccountancyByFilter} = require("./account.controller");
const router = require("express").Router();

router.post("/", createAccountancy);
router.get("/",  getAccountancy);
router.get("/bydate", getbyDateAccountancy);
router.get("/byfilter", getAccountancyByFilter);
router.patch("/", updateAccountancy);
router.delete("/", deleteAccountancy);

module.exports = router;