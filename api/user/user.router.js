const {createUser, getUsers, getUsersById, updateUser, deleteUSer, login} =  require ("./user.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/token_validation");

router.post("/", createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", getUsersById);
router.patch("/", updateUser);
router.delete("/", deleteUSer);
router.post("/login", login);


module.exports = router;