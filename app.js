const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js"); // Error handle for async functions
const expressError = require("./utils/expressError.js"); // Custom error
const {listingSchema , reviewSchema} = require("./schema.js");
const Review = require("./models/review.js"); //Review Schema Import
const listings = require("./router/listing.js");


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const port = 3000;

const MONGO_URL = "mongodb://127.0.0.1:27017/Roomio";
async function main() {
    await mongoose.connect(MONGO_URL);
}
main()
    .then(() => console.log("Connection to db successful"))
    .catch(err => console.log(err));


// ================= ROUTES START =================

// Home
app.get("/", (req, res) => {
    res.send("App is getting");
});



//Review Middleware
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new expressError(400, errMsg);
    } else {
        next();
    }
};
// Test Route
// app.get("/testListing", wrapAsync(async (req, res) => {
//     let sampleListing = new Listing({
//         title: "Novotel",
//         description: "By the beach",
//         price: 1200,
//         location: "Berlin",
//         country: "Germany"
//     });

//     await sampleListing.save();
//     res.send("SuccessFull");
// }));

app.use('/listings' , listings);

//Review Route
//post route
app.post("/listings/:id/reviews" , validateReview , wrapAsync( async (req , res) =>{
    let{id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    console.log("new Review saved");
    res.redirect(`/listings/${id}`);

}));

//Delete Route
app.delete("/listings/:id/reviews/:reviewId" , wrapAsync( async (req ,res )=>{
      
    let{id , reviewId} = req.params ;
    await Listing.findByIdAndUpdate(id , {$pull: {reviews: reviewId}});   // This is for deleting the array in listing // listing ke andar reviews ke andar reviewId match karega and then delete karega
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}));



// ================= ERROR HANDLING =================


// 404
app.use((req, res, next) => {
    next(new expressError(404, "Page Not Found"));
});

// Error Middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", {err});
});

// ================= SERVER =================
app.listen(port, () => {
    console.log(`App is listening on the port ${port}`);
});
