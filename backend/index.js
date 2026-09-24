const express= require("express");
const cors=require("cors");
const mongoose=require("mongoose");
require("dotenv").config();

const app=express();

app.use(express.json());
app.use(cors());

const mongo=process.env.mongodb_url;

mongoose.connect(mongo).then(function(){
    console.log("db success");
}).catch(function(data){
    console.log("db fail",data);
})

const user= mongoose.model("user",{username:String , password:Number,activity: [String]},"user")

/*user.find().then(function(retdata){
    console.log(retdata);
}).catch(function(){
    console.log("error in retriving data");
})*/

app.get("/login",function(req,res){
    user.find().then(function(retdata){
        res.send(retdata);
        console.log(retdata.data);
    })
})

app.post("/signup", function(req, res) {

    const newusername = req.body.username;
    const newpassword = req.body.password;

    user.findOne({
        $or: [
            { username: newusername },
            { password: newpassword }
        ]
    })
    .then(function(existingUser) {

        if (existingUser) {

            if (existingUser.username === newusername) {
                res.send("username already exists");
            }
            else if (existingUser.password === newpassword) {
                res.send("password already exists");
            }

        }
        else {

            const new_user = new user({
                username: newusername,
                password: newpassword,
                activity: []
            });

            new_user.save()
                .then(function() {
                    res.send("signup successful");
                })
                .catch(function() {
                    res.send("error creating user");
                });
        }
    })
    .catch(function() {
        res.send("error checking user");
    });
});

app.post("/activity", function(req, res) {
    const username = req.body.username;
    const newActivity = req.body.activity;

    user.updateOne(
        { username: username },
        { $push: { activity: newActivity } }
    )
    .then(function() {
        res.send("Activity added successfully");
    })
    .catch(function() {
        res.send("Error adding activity");
    });
});

app.get("/getact", function(req, res) {
    const username = req.query.username;

    user.findOne({ username: username })
        .select("activity -_id")
        .then(function(retdata) {
            // console.log(retdata);
            if (!retdata) { return res.send([]); }
             res.send(retdata.activity || []);
            // res.send(retdata.activity);
        })
        .catch(function() {
            res.send("Error");
        });
});

app.delete("/activity", function(req, res) {

    const username = req.body.username;
    const activity = req.body.activity;

    user.updateOne(
        { username: username },
        { $pull: { activity: activity } }
    )
    .then(function() {
        res.send("Activity deleted successfully");
    })
    .catch(function() {
        res.send("Error deleting activity");
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

// app.listen(5000,function(){
//     console.log("Server started");
// })