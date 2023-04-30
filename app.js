const express = require("express");
const cors = require("cors");

const itemRouter = require("./app/routes/item.route");
const userRouter = require("./app/routes/user.route");
// const customerRouter = require("./app/routes/customer.route");
const billRouter = require("./app/routes/bill.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/item", itemRouter);
app.use("/api/user", userRouter);
// app.use("/api/customer", customerRouter);
app.use("/api/bill", billRouter);


app.get('/', (req, res) => {
    res.json({
      message: "Welcome to application."
    });
  });

app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'));
  });
  
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
      message: err.message || 'Internal Server Error'
    });
  });
module.exports = app;