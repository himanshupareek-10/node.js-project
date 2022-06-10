const {MongoClient} = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const database = "node_project";
const collection = "people";

const connection = client.connect().then(res=>res.db(database).collection(collection));

module.exports = connection;