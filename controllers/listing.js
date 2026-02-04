const Listing = require('../models/listing.js');


module.exports.index = async (req, res) => {
    const listings = await Listing.find({});
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
    res.render("listings/edit.ejs", { editListing });
};

module.exports.addNewListing = async (req, res) => {
   
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success" , "New listing created successfully!");
    res.redirect("/listings");
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(
        id,
        {...req.body.listing },
    );
    req.flash("success" , "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success" , "Listing deleted successfully!");
    res.redirect("/listings");
};