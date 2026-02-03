const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

const MONGO_URL = 'mongodb://127.0.0.1:27017/Roomio';
async function main() {
    await mongoose.connect(MONGO_URL); 
}
main()
    .then(() => console.log("Connection successful"))
    .catch(err => console.log(err));


const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=> ({...obj, owner:'69808cfbfb1ee1e2fdb2c5e4'}))
    await Listing.insertMany(initData.data);
    console.log(initData.data);
}

initDB();