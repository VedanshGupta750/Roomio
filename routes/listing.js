const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); // Error handle for async functions
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");
const  ListingController = require('../controllers/listing.js');
//Validate listing middleware


// INDEX ROUTE
router.get("/", wrapAsync(ListingController.index));

// New lsiting route
router.get("/new", isLoggedIn ,ListingController.renderForm);

// SHOW ROUTE (generic :id always after specific routes)
router.get("/:id", wrapAsync(ListingController.showListing));

//edit route
router.get("/:id/edit" , isLoggedIn, isOwner ,wrapAsync(ListingController.renderEditListingForm));




// Post  Create new Listing route
router.post("/",isLoggedIn ,validateListing, wrapAsync(ListingController.addNewListing));



//update Route
router.patch("/:id", isLoggedIn , isOwner,validateListing , wrapAsync(ListingController.updateListing));

// DELETE ROUTE
router.delete("/:id", isLoggedIn,isOwner, wrapAsync(ListingController.destroyListing));



module.exports = router;