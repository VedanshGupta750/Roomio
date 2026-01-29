const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js"); // Error handle for async functions
const { reviewSchema} = require("../schema.js");
const expressError = require("../utils/expressError.js"); // Custom error
const Listing = require("../models/listing.js");
const Review = require("../models/review.js"); 

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

//Review Route
//post route
router.post("/" , validateReview , wrapAsync( async (req , res) =>{
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
router.delete("/:reviewId" , wrapAsync( async (req ,res )=>{
      
    let{id , reviewId} = req.params ;
    await Listing.findByIdAndUpdate(id , {$pull: {reviews: reviewId}});   // This is for deleting the array in listing // listing ke andar reviews ke andar reviewId match karega and then delete karega
    await Review.findByIdAndDelete(reviewId);
    console.log('Review Deleted');
    res.redirect(`/listings/${id}`);
}));

module.exports = router;