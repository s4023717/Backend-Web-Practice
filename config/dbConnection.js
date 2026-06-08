const mongoose = require("mongoose")

const connectdb = async () => {
    try {
        const connect = await mongoose.connect("mongodb+srv://admin:123@contacts-backend.ljnhzns.mongodb.net/contacts-backend?appName=contacts-backend");
        console.log("DB connected: ", connect.connection.host, connect.connection.name)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
};

module.exports = connectdb;