const BillService = require("../service/bill.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error")
const { ObjectId } = require("mongodb");
exports.createBill = async (req, res, next)=>{
    const address = req.body.address;
    const indentification = req.body.indentification;
    const nameCustomer = req.body.nameCustomer;
    const ngaylap =  req.body.ngaylap;
    const ngaymuon = req.body.ngaymuon;
    const ngaytra = req.body.ngaytra;
    const ngaytrahientai = "";
    const phone = req.body.phone;
    const tinhTrang =  req.body.tinhTrang;
    const products =  req.body.products;
    const tongTien = req.body.tongTien;
    try {
        const client = await MongoDB.connect();
        const all = await client.db().collection("bills").insertOne({
            address:address,
            indentification: indentification,
            nameCustomer: nameCustomer,
            ngaylap: ngaylap,
            ngaymuon: ngaymuon,
            ngaytra: ngaytra,
            ngaytrahientai: ngaytrahientai,
            phone: phone,
            tinhTrang: tinhTrang,
            products: products,
            tongTien: tongTien,
        });
        res.json({result: 'success', errorCode: 0, data: all});
       
       
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
        
    }
};
exports.findAllBill = async (req, res, next)=>{
    let documents = [];

    try {
        const billService = new BillService(MongoDB.client);
        const {nameCustomer} = req.query;
        if(nameCustomer){
            documents = await billService.findByName(nameCustomer);
        } else {
            documents = await billService.find({});
        }
        
    } catch (error){
        return next (
            new ApiError(500, "An error occurred while find the bill")
        );
    }
    return res.send(documents);
};
exports.findOne = async (req, res, next)=>{
    try {
        const billService = new BillService(MongoDB.client);
        const document = await billService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404, "bill not found"));
        } 
        return res.send(document);       
    } catch (error){
        return next (
            new ApiError(500, `Error retrieving bill with id=${req.params.id}`)
        );
    }
};
exports.updateTinhTrang = async (req, res, next)=>{

    try {
        const client = await MongoDB.connect();
        const all = await client.db().collection("bills").findOne({_id: new ObjectId(req.params.id)})
        const response = await client.db().collection("bills").updateOne({_id: new ObjectId(req.params.id)},{$set:{tinhTrang: !all.tinhTrang}});
        res.json({response});
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
        
    }
};
exports.updateNgayTraHientai = async (req, res, next)=>{

    try {
        var today = new Date();
        var date = today.getDay()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        const client = await MongoDB.connect();
        const all = await client.db().collection("bills").findOne({_id: new ObjectId(req.params.id)})
        const response = await client.db().collection("bills").updateOne({_id: new ObjectId(req.params.id)},{$set:{ngaytrahientai: date}});
        res.json({response});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
        
    }
};