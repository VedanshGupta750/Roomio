const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); // Error handle for async functions
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner , validateListing , validateUpdateListing} = require("../middleware.js");
const  ListingController = require('../controllers/listing.js');
const{storage} = require('../cloudConfig.js')
const multer  = require('multer')
const upload = multer({ storage})


router
.route('/')
.get(wrapAsync(ListingController.index))
.post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(ListingController.addNewListing));

// New lisiting route
router.get("/new", isLoggedIn ,ListingController.renderForm);

router
.route("/:id")
.get(wrapAsync(ListingController.showListing))
.patch(isLoggedIn , isOwner,upload.single('listing[image]'),validateUpdateListing, wrapAsync(ListingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(ListingController.destroyListing))

//edit route
router.get("/:id/edit" , isLoggedIn, isOwner ,wrapAsync(ListingController.renderEditListingForm));



module.exports = router;