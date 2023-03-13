const ItemService = require("../service/item.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error")

exports.create = async (req, res, next)=>{
    if (!req.body?.ten) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const itemService = new ItemService(MongoDB.client);
        const document = await itemService.create(req.body);
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
        const itemService = new ItemService(MongoDB.client);
        const {ten} = req.query;
        if(ten){
            documents = await itemService.findByName(ten);
        } else {
            documents = await itemService.find({});
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
        const itemService = new ItemService(MongoDB.client);
        const document = await itemService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404, "item not found"));
        } 
        return res.send(document);       
    } catch (error){
        return next (
            new ApiError(500, `Error retrieving item with id=${req.params.id}`)
        );
    }
};
exports.update = async (req, res, next)=>{
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const itemService = new ItemService(MongoDB.client);
        const document = await itemService.update(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, "item not found"));
        }
        return res.send({message:"item was update successfully"});
    } catch (error){
        return next (
            new ApiError(500, `Error updating item with id=${req.params.id}`)
        );
    }
};
exports.delete = async (req, res, next)=>{
    try {
        const itemService = new ItemService(MongoDB.client);
        const document = await itemService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404, "item not found"));
        } 
        return res.send({message: "item was deleted successfully"});       
    } catch (error){
        return next (
            new ApiError(500, `Could not delete item with id=${req.params.id}`)
        );
    }
};
