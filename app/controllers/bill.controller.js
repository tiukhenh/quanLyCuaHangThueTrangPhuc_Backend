const BillService = require("../service/bill.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error")

exports.createBill = async (req, res, next)=>{
    if (!req.body?._id_hd && !req.body?._id_kh) {
        return next(new ApiError(400, "id can not be empty"));
    }
    try {
        const billService = new BillService(MongoDB.client);
        const document = await billService.create(req.body);
        return res.send(document);
    } catch (error){
        return next (
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};
exports.findAllBill = async (req, res, next)=>{
    res.send({message: "createBill "})
};