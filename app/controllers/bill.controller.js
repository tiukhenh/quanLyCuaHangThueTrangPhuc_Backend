const BillService = require("../service/bill.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error")

exports.createBill = async (req, res, next)=>{
    const address = req.body.address;
    const indentification = req.body.indentification;
    const nameCustomer = req.body.nameCustomer;
    const ngaylap =  req.body.ngaylap;
    const ngaymuon = req.body.ngaymuon;
    const ngaytra = req.body.ngaytra;
    const phone = req.body.phone;
    const tinhTrang =  req.body.tinhTrang;
    const products =  req.body.products;
    try {
        const client = await MongoDB.connect();
        const all = await client.db().collection("bills").insertOne({
            address:address,
            indentification: indentification,
            nameCustomer: nameCustomer,
            ngaylap: ngaylap,
            ngaymuon: ngaymuon,
            ngaytra: ngaytra,
            phone: phone,
            tinhTrang: tinhTrang,
            products: products,
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