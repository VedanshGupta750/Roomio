const Review = require("../models/review.js");
const Listing = require("../models/listing.js")

module.exports.addReview = async (req , res) =>{
    let{id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview)
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success" , "Rewiew created successfully!");
    res.redirect(`/listings/${id}`);

};

module.exports.destroyReview = async (req ,res )=>{
      
    let{id , reviewId} = req.params ;
    await Listing.findByIdAndUpdate(id , {$pull: {reviews: reviewId}});   // This is for deleting the array in listing // listing ke andar reviews ke andar reviewId match karega and then delete karega
    await Review.findByIdAndDelete(reviewId);
    req.flash("success" , "Rewiew deleted successfully!");
    res.redirect(`/listings/${id}`);
};