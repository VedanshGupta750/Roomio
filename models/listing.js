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
        default: "https://picsum.photos/800/600?random=101",
        set: (v) =>
            v === ""
                ? "https://picsum.photos/800/600?random=101"
                : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
