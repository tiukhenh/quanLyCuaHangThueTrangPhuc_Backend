const UserService = require("../service/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error")
var jwt = require('jsonwebtoken');
const secret_key = '12345aA!';

exports.createUser = async (req, res, next)=>{
    if (!req.body?.userName) {
        return next(new ApiError(400, "userName can not be empty"));
    }
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.createUser(req.body);
        return res.send(document); 
    } catch (error){
        return next (
            new ApiError(500, "An error occurred while creating the user")
        );
    }
};
exports.findAllUser = async (req, res, next)=>{
    let documents = [];

    try {
        const userService = new UserService(MongoDB.client);
        const {name} = req.query;
        if(name){
            documents = await userService.findByName(name);
        } else {
            documents = await userService.find({});
        }
        
    } catch (error){
        return next (
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
    return res.send(documents);
};
exports.findOneUser = async (req, res, next)=>{
    res.send({message: "findOne item"})
};
exports.updateUser = async (req, res, next)=>{
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, "user not found"));
        }
        return res.send({message:"user was update successfully"});
    } catch (error){
        return next (
            new ApiError(500, `Error updating user with id=${req.params.id}`)
        );
    }
};
exports.deleteUser = async (req, res, next)=>{
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.deleteUser(req.body?.userName);
        if(!document){
            return next(new ApiError(404, "User not found"));
        } 
        return res.send({message: "User was deleted successfully"});       
    } catch (error){
        return next (
            new ApiError(500, `Could not delete User with id=${req.body?.userName}`)
        );
    }
};
exports.login = async (req, res, next)=>{
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findByUserName(req.body?.userName);
        
        if(!document[0]){
            return res.json({
                message: "Not find username",
                status: 404
            })
        } 
        if(document[0].password != req.body?.password){
            return res.json({
                message: "Password not right",
                status: 400
            })   
        }
        const token = jwt.sign({userName: document[0].userName},secret_key,{expiresIn: '1d'});
        console.log(token);
        return res.json({
            status: 200,
            result: 'success',
            token: token,
            data: document[0],
        });
        
    } catch (error){
        return next (
            new ApiError(500, `Error retrieving contact with id=${req.params.userName}`)
        );
    }
};
exports.logout = async (req, res, next)=>{
    res.send({message: "logout"})
};
    