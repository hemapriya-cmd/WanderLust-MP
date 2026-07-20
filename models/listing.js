const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    } ,
    description : String,
    image : {
        type : String, //url
        default : "https://images.pexels.com/photos/19785248/pexels-photo-19785248.jpeg?cs=srgb&dl=pexels-followingnyc-19785248.jpg&fm=jpg",
        set : (v) => v === "" ? "https://images.pexels.com/photos/19785248/pexels-photo-19785248.jpeg?cs=srgb&dl=pexels-followingnyc-19785248.jpg&fm=jpg" : v,
    },
    price : Number,
    location : String,
    country : String,
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;