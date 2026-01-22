const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js")
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // used to decode the post request data entered by the user
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate)

const port = 3000;

const MONGO_URL = 'mongodb://127.0.0.1:27017/Roomio';
async function main() {
    await mongoose.connect(MONGO_URL);
}
main()
    .then(() => console.log("Connection to db successful"))
    .catch(err => console.log(err));



app.get('/', (req, res) => {
    res.send("App is getting");
})

app.get('/testListing', async (req, res) => {
    let sampleListing = new Listing({
        title: "Novotel",
        description: "By the beach",
        price: 1200,
        location: "Berlin",
        country: "Germany"

    });


    await sampleListing.save();
    console.log("Sample image");
    res.send("SuccessFull");
})
//Index Route
app.get("/listings", async (req, res) => {
    const listings = await Listing.find({})
    res.render("listings/listings.ejs", { listings });
})
//Add new Listing
app.get('/listings/new', (req, res) => {
    console.log(res);
    res.render("listings/new.ejs");
})
app.post('/listings',wrapAsync( async (req, res) => {
    
            let { title, description, image, price, location, country } = req.body;

    let addListing = await Listing.insertOne({
        title: title,
        description: description,
        image: image,
        price: price,
        location: location,
        country: country

    })
    addListing.save().then((res) => console.log(res))
        .catch(err => console.log(err));
    console.log(addListing);
    res.redirect('/listings');
    }
));


//Show Route
app.get('/listings/:id', async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
})

//Update Route
app.get('/listings/:id/edit', async (req, res) => {

    let { id } = req.params;
    let editListing = await Listing.findById(id);
    res.render("listings/edit.ejs", { editListing });
})

app.patch('/listings/:id', async (req, res) => {
    let { id } = req.params;

    let { title, description, image, price, location, country } = req.body;

    let editListing = await Listing.findByIdAndUpdate(id, {
        title,
        description,
        image,
        price,
        location,
        country

    }, { runValidators: true, new: true })
    editListing.save().then((res) => console.log(res))
        .catch(err => console.log(err));
    console.log(editListing);
    res.redirect(`/listings/${id}`);
})

//DELETE Route
app.delete('/listings/:id', async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    deleteListing.save().then((res) => console.log(res))
        .catch(err => console.log(err));
    console.log("Deleted Successfully");
    res.redirect(`/listings`);

})

app.use((err ,req ,res , next)=>{
    res.send("Something went wrong");
});

app.listen(port, () => {
    console.log(`App is listening on the port ${port}`);
})