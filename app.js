const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js"); // Custom error
const listings = require("./router/listing.js");
const reviews = require("./router/review.js")

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


// Home
app.get("/", (req, res) => {
    res.send("App is getting");
});




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
app.use("/listings/:id/reviews" , reviews);




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
