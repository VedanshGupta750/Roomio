const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js"); // Error handle for async functions
const Listing = require("../models/listing.js");
const Review = require("../models/review.js"); 
const {validateReview, isLoggedIn , isReviewOwner} = require("../middleware.js");
const reviewController = require('../controllers/review.js');

//post route
router.post("/" ,isLoggedIn, validateReview , wrapAsync( reviewController.addReview ));

//Delete Route
router.delete("/:reviewId" ,isLoggedIn, isReviewOwner , wrapAsync( reviewController.destroyReview ));

module.exports = router;