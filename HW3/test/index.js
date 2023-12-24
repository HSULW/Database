var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var app = express();
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://hsu:qaz15988@cluster0.viar5ji.mongodb.net/?retryWrites=true&w=majority";
var DATABASE_NAME = "sports";  // 這裡應該是 "sports"
var database;

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        database = client.db(DATABASE_NAME);
        console.log("MongoDB Connection Successful");
    });
});
