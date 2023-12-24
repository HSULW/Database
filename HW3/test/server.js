const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// 建立 express 實例
const app = express();

// 設定 view engine、靜態資源和 bodyParser
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// 建立 MongoDB 連線
const CONNECTION_STRING = "mongodb+srv://hsu:qaz15988@cluster0.viar5ji.mongodb.net/sports?retryWrites=true&w=majority";
const DATABASE_NAME = "sports";
let database;

// 建立 express 伺服器
app.listen(5038, () => {
    mongoose.connect(CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on("connected", () => {
        console.log("MongoDB Connection Successful");

        // 定義資料庫模型
        const itemSchema = new mongoose.Schema({
            sport: String,
            time: Number,
        });

        // 建立 Item 模型
        const Item = mongoose.model("Item", itemSchema);

        app.get("/", async (req, res) => {
            try {
                const foundItems = await Item.find({});
                res.render("index", { items: foundItems });
            } catch (err) {
                console.error(err);
                res.status(500).send("Internal Server Error");
            }
        });

        app.post("/", (req, res) => {
            const newItem = new Item({
                sport: req.body.sport,
                time: req.body.time,
            });

            newItem.save();
            res.redirect("/");
        });

        app.post("/delete", (req, res) => {
            const itemId = req.body.itemId;
            Item.deleteOne({ _id: itemId })
                .then(() => {
                    console.log("Successfully deleted item.");
                    res.redirect("/");
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send("Internal Server Error");
                });
        });
        
        app.post("/edit", (req, res) => {
            const itemId = req.body.itemId;
            const newSport = req.body.newSport;
            const newTime = req.body.newTime;
        
            Item.findByIdAndUpdate(itemId, { sport: newSport, time: newTime })
                .then((updatedItem) => {
                    if (updatedItem) {
                        console.log("Successfully updated item.");
                        res.redirect("/");
                    } else {
                        res.status(404).send("Item not found");
                    }
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send("Internal Server Error");
                });
        });
        

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });
});
