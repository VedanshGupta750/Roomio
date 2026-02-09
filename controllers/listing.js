const Listing = require('../models/listing.js');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
module.exports.index = async (req, res) => {
    const { category } = req.query;
    let listings;

    if (category) {
        listings = await Listing.find({ category: category });
        if(listings.length === 0) {
            req.flash("error", "No listings found in this category!");
            return res.redirect("/listings");
        }
    } else {
        listings = await Listing.find({});
    }
    res.render("listings/listings.ejs", { listings });
};

module.exports.renderForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({path:"reviews" , populate: {path:"author"} }).populate("owner");
    if(!listing){
        req.flash("error" , "Listing you requested does not exists!");
        return res.redirect('/listings');
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};

module.exports.renderEditListingForm = async (req, res) => {
    let { id } = req.params;
    let editListing = await Listing.findById(id);
    if(!editListing){
        req.flash("error" , "Listing you requested does not exists!");
        return res.redirect('/listings');
    }
    let originalImageUrl = editListing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload" , "/upload/w_400")
    res.render("listings/edit.ejs", { editListing  , originalImageUrl});
};

module.exports.addNewListing = async (req, res) => {
  let response = await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1,
})
  .send()

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url , filename};
    newListing.geometry = response.body.features[0].geometry;
    let savedListing = await newListing.save();
    console.log(savedListing)
    req.flash("success" , "New listing created successfully!");
    res.redirect("/listings");
};

module.exports.updateListing = async (req, res) => {
    
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(
        id,
        {...req.body.listing },
    );
    
    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url , filename};
    await listing.save();
    }
    req.flash("success" , "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success" , "Listing deleted successfully!");
    res.redirect("/listings");
};