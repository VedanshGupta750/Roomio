const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); // Error handle for async functions
const {listingSchema} = require("../schema.js");
const expressError = require("../utils/expressError.js"); // Custom error
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");

//Validate listing middleware
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new expressError(400, errMsg);
    } else {
        next();
    }
};

// INDEX ROUTE
router.get("/", wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/listings.ejs", { listings });
}));

// New lsiting route
router.get("/new", isLoggedIn ,(req, res) => {
    res.render("listings/new.ejs");
});

// SHOW ROUTE (generic :id always after specific routes)
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews").populate("owner");
    if(!listing){
        req.flash("error" , "Listing you requested does not exists!");
        return res.redirect('/listings');
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
}));

//edit route
router.get("/:id/edit" , isLoggedIn ,wrapAsync(async (req, res) => {
    let { id } = req.params;
    let editListing = await Listing.findById(id);
    if(!editListing){
        req.flash("error" , "Listing you requested does not exists!");
        return res.redirect('/listings');
    }
    res.render("listings/edit.ejs", { editListing });
}));




// Post  Create new Listing route
router.post("/",isLoggedIn ,validateListing, wrapAsync(async (req, res) => {
   
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success" , "New listing created successfully!");
    res.redirect("/listings");
}));



//update Route
router.patch("/:id", isLoggedIn ,validateListing , wrapAsync(async (req, res) => {
    let { id } = req.params;

    await Listing.findByIdAndUpdate(
        id,
        {...req.body.listing },
    );
    req.flash("success" , "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
}));

// DELETE ROUTE
router.delete("/:id", isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success" , "Listing deleted successfully!");
    res.redirect("/listings");
}));



module.exports = router;