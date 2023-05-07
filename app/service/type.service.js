const {ObjectId} = require("mongodb");

class TypeService {
    constructor(client) {
        this.Type = client.db().collection("types");
    }

    extractTypeData(payload) {
        const type ={
            ten: payload.ten,
        };
        Object.keys(type).forEach(
            (key) => type[key] === undefined && delete type[key]
        );
        return type;
    }

    async create(payload){
        const type = this.extractTypeData(payload);
        const result = await this.Type.findOneAndUpdate(
            type,
            {$set: {}},
            {returnDocument: "after", upsert: true}
        );
        return result.value;
    }
    async find(filter){
        const cursor = await this.Type.find(filter);
        return await cursor.toArray();
    }

    async findByName(ten){
        return await this.find({
            ten: {$regex: new RegExp(ten), $options: "i"},
        });
    }
    async findById(id) {
        return await this.Type.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        });
    }
}
module.exports = TypeService;