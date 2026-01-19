const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MONGO_URL = 'mongodb://127.0.0.1:27017/Roomio';
async function main() {
    await mongoose.connect(MONGO_URL); 
}
main()
    .then(() => console.log("Connection successful"))
    .catch(err => console.log(err));

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,

    },
    description: String,
    image: {
        type: String,
        default: "https://unsplash.com/photos/an-in-n-out-burger-restaurant-at-night-__LLQbt1lEM",
        set: (v) => v==="" ? "https://unsplash.com/photos/an-in-n-out-burger-restaurant-at-night-__LLQbt1lEM" : v,
    },
    price: Number,
    location: String,
    country: String

})

const Listing = mongoose.model("Listing" , listingSchema);

module.exports = Listing;