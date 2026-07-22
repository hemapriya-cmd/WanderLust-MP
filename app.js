const express = require("express");
const app = express();

const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";

const Listing = require("./models/listing.js");

const path = require("path");

const methodOverride = require("method-override");

const ejsMate = require("ejs-mate");



main()
    .then(() => {
        console.log("connected to db");
    })
    .catch(err => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname,"/public")))

app.get("/" , (req,res) => {
    res.send(" i am root");
});

//index route
app.get("/listing" , async(req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs" , {allListings});
});


//new route
app.get("/listing/new" , (req,res) => {
    res.render("listings/new.ejs");
})

//show route
app.get("/listing/:id" , async(req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs" , {listing});
});

//create Route
app.post("/listing" , async(req,res) => {
    // let {title ,description ,image ,price ,location ,country} = req.body;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");
});

app.get("/listing/:id/edit" , async(req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs" , {listing});
});

//Update Route
app.put("/listing/:id" , async(req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    await Listing.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect(`/listing/${id}`);
});

//Delete Route
app.delete("/listing/:id" , async(req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listing");
})
// app.get("/testListing" , async(req,res) => {
//     let sampleListing = new Listing({
//         title : "My New Villa",
//         description : "By the beach",
//         price : 1200,
//         location : "Calangute,Goa",
//         country : "India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful sending");
// })

app.listen(2000 , () => {
    console.log("server is listening to port 2000");
})