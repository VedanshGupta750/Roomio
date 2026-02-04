const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); // Error handle for async functions
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");
const  ListingController = require('../controllers/listing.js');
const{storage} = require('../cloudConfig.js')
const multer  = require('multer')
const upload = multer({ storage})


router
.route('/')
// .get(wrapAsync(ListingController.index))
// .post(isLoggedIn ,validateListing, wrapAsync(ListingController.addNewListing));
.post( upload.single('listing[image]'), function (req, res, next) {
    res.send(req.file)
});

// New lisiting route
router.get("/new", isLoggedIn ,ListingController.renderForm);

router
.route("/:id")
.get(wrapAsync(ListingController.showListing))
.patch(isLoggedIn , isOwner,validateListing , wrapAsync(ListingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(ListingController.destroyListing))

//edit route
router.get("/:id/edit" , isLoggedIn, isOwner ,wrapAsync(ListingController.renderEditListingForm));



module.exports = router;