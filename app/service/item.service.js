const {ObjectId} = require("mongodb");

class ItemService {
    constructor(client) {
        this.Item = client.db().collection("items");
    }

    extractItemData(payload) {
        const item ={
            ten: payload.ten,
            loai: payload.loai,
            mauSac: payload.mauSac,
            gia: payload.gia,
            tinhTrang: payload.tinhTrang,
        };
        Object.keys(item).forEach(
            (key) => item[key] === undefined && delete item[key]
        );
        return item;
    }

    async create(payload){
        const item = this.extractItemData(payload);
        const result = await this.Item.findOneAndUpdate(
            item,
            {$set: {tinhTrang: item.tinhTrang === true}},
            {returnDocument: "after", upsert: true}
        );
        return result.value;
    }
    async find(filter){
        const cursor = await this.Item.find(filter);
        return await cursor.toArray();
    }

    async findByName(ten){
        return await this.find({
            ten: {$regex: new RegExp(ten), $options: "i"},
        });
    }
    async findById(id) {
        return await this.Item.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        });
    }
    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) :null,
        };
        const update = this.extractItemData(payload);
        const result = await this.Item.findOneAndUpdate(
            filter,
            { $set: update},
            { returnDocument: "after"}
        );
        return result.value;
    }
    async delete(id) {
        const result = await this.Item.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) :null,
        });
        return result.value;
    }
}
module.exports = ItemService;