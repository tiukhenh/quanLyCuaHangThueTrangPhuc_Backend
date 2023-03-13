const {ObjectId} = require("mongodb");

class BillService {
    constructor(client) {
        this.Bill = client.db().collection("bill")
    }
    extractBillData(payload) {
        const bill ={
            _id_hd: payload._id_hd,
            nameCustomer: payload.nameCustomer,
            address:  payload.address, 
            phone: payload.phone,      
            indentification: payload.indentification,
            ngaylap: payload.ngaylap,
            ngaymuon: payload.ngaymuon,
            ngaytra: payload.ngaytra,
        };
        Object.keys(bill).forEach(
            (key) => bill[key] === undefined && delete bill[key]
        );
        return bill;
    }

    async create(payload){
        const bill = this.extractBillData(payload);
        const result = await this.Bill.findOneAndUpdate(
            bill,
            {$set: {}},
            {returnDocument: "after", upsert: true}
        );
        return result.value;
    }
    async find(filter){
        const cursor = await this.Bill.find(filter);
        return await cursor.toArray();
    }

    async findByName(ten){
        return await this.find({
            ten: {$regex: new RegExp(ten), $options: "i"},
        });
    }
    async findById(id) {
        return await this.Bill.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        });
    }

}
module.exports = BillService;