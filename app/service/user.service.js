const {ObjectId} = require("mongodb");

    // "userName": "khanhtu",
    // "name": "Ông Tú Khanh",
    // "address":  "132/15kd", 
    // "phone": "0987432351",      
    // "password": "khanh123" 

class UserService {
    constructor(client) {
        this.User = client.db().collection("user");
    }

    extractUserData(payload) {
        const user ={
            userName: payload.userName,
            name: payload.name,
            address:  payload.address, 
            phone: payload.phone,      
            password: payload.password,
        };
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }
    async createUser(payload){
        const user = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            user,
            {$set: {}},
            {returnDocument: "after", upsert: true}
        );
        return result.value;
    }
    async find(filter){
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }
    async findByName(name){
        return await this.find({
            name: {$regex: new RegExp(name), $options: "i"},
        });
    }
    async findByUserName(userName) {
        return await this.find({
            userName: userName 
        });
    }
    async deleteUser(userName) {
        const result = await this.User.findOneAndDelete({
            userName: userName 
        });
        return result.value;
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) :null,
        };
        const update = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            filter,
            { $set: update},
            { returnDocument: "after"}
        );
        return result.value;
    }
}
module.exports = UserService;