const TypeService = require("../service/type.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { ObjectId } = require("mongodb");

exports.create = async (req, res, next)=>{
    if (!req.body?.ten) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const typeService = new TypeService(MongoDB.client);
        const document = await typeService.create(req.body);
        return res.send(document);
    } catch (error){
        return next (
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};
exports.findAll = async (req, res, next)=>{
    let documents = [];

    try {
        const typeService = new TypeService(MongoDB.client);
        const {ten} = req.query;
        if(ten){
            documents = await typeService.findByName(ten);
        } else {
            documents = await typeService.find({});
        }
        
    } catch (error){
        return next (
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
    return res.send(documents);
};
exports.findOne = async (req, res, next)=>{
    try {
        const typeService = new TypeService(MongoDB.client);
        const document = await typeService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404, "type not found"));
        } 
        return res.send(document);       
    } catch (error){
        return next (
            new ApiError(500, `Error retrieving type with id=${req.params.id}`)
        );
    }
};

