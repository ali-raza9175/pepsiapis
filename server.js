require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require("./api/user/user.router");
const InventoryRouter = require("./api/inventory/inventory.router")
const accountsRouter = require("./api/account/account.router")
const transectionRouter = require("./api/transection/transection.router")
var cors = require('cors')


// create express app
const app = express();
app.use(cors())

// Setup server port
const port = process.env.APP_PORT;

app.use(express.json());

app.use("/api/inventory" , InventoryRouter);
app.use("/api/user", userRouter);
app.use("/api/accounts", accountsRouter);
app.use("/api/transection", transectionRouter);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});