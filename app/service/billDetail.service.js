const {ObjectId} = require("mongodb");

class BillDetailService {
    constructor(client) {
        this.BillDetail = client.db().collection("billDetail")
       
    }
    extractBillDetailData(payload) {
        // let product_id = payload.product_id;
        // let product_price = payload.product_price;
        const count = payload.soluong;
        let products = [];
        for (var i=0; i<count; i++){
            let product ={
                product_id :payload.product[i].product_id,
                product_price : payload.product[i].product_price
            }
            products.push(product);
        }
        const billDetail ={
            _id_hd: payload._id_hd,
            soluong: payload.soluong,
            product:products,
            total: payload.total,
        };
        Object.keys(billDetail).forEach(
            (key) => billDetail[key] === undefined && delete billDetail[key]
        );
        return billDetail;
    }

    async create(payload){
        const billDetail = this.extractBillDetailData(payload);
        const result = await this.BillDetail.findOneAndUpdate(
            billDetail,
            {$set: {}},
            {returnDocument: "after", upsert: true}
        );
        return result.value;
    }
    async find(filter){
        const cursor = await this.BillDetail.find(filter);
        return await cursor.toArray();
    }

    async findByName(_id_hd){
        return await this.find({
            _id_hd: {$regex: new RegExp(_id_hd), $options: "i"},
        });
    }
    async findById(id) {
        return await this.BillDetail.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        });
    }

}
module.exports = BillDetailService;