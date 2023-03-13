const BillDetailService = require("../service/billDetail.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error")

exports.createBillDetail = async (req, res, next)=>{
    if (!req.body?._id_hd ) {
        return next(new ApiError(400, "id can not be empty"));
    }
    try {
        const billDetailService = new BillDetailService(MongoDB.client);
        const document = await billDetailService.create(req.body);
        return res.send(document);
    } catch (error){
        return next (
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.findAllBillDetail = async (req, res, next)=>{
    let documents = [];

    try {
        const billDetailService = new BillDetailService(MongoDB.client);
        const {_id_hd} = req.query;
        if(_id_hd){
            documents = await billDetailService.findByName(_id_hd);
        } else {
            documents = await billDetailService.find({});
        }
        
    } catch (error){
        // return next (
        //     new ApiError(500, "An error occurred while creating the contact")
        // );
        return res.send(documents);
    }
    return res.send(documents);
};



 