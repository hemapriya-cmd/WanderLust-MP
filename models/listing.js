const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    } ,
    description : String,
    image: {

        filename: String,
        url: String,
    },
    price : Number,
    location : String,
    country : String,
    propertyType: {
        type: String,
        enum: [
            "Villa",
            "Apartment",
            "Cottage",
            "Homestay",
            "Resort",
            "Treehouse",
            "Cabin",
            "Farmhouse",
            "Tent",
            "Beach House",
            "Houseboat",
            "Bungalow",
            "Studio",
            "Luxury Suite",
            "Heritage Haveli"
        ]
    },

    amenities: [String],

    rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.5,
},

    bedrooms: Number,

    bathrooms: Number,

    maxGuests: Number,

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
});

listingSchema.post("findOneAndDelete" , async(listing) => {
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});
    };
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;