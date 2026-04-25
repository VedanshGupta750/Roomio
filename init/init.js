    const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

require("dotenv").config({ path: "../.env" });

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const geocodingClient = mbxGeocoding({
  accessToken: process.env.MAP_TOKEN,
});
const dbUrl = process.env.ATLASDB_URL;
async function main() {
    await mongoose.connect(dbUrl);
}
main()
    .then(() => console.log("Connection to db successful"))
    
    .catch(err => console.log(err));


const initDB = async () => {

  await Listing.deleteMany({});

  for (let obj of initData.data) {
    const geoResponse = await geocodingClient
      .forwardGeocode({
        query: `${obj.location}, ${obj.country}`,
        limit: 1,
      })
      .send();

    obj.geometry = {
      type: "Point",
      coordinates: geoResponse.body.features[0].geometry.coordinates,
    };
  }
  

  // original logic untouched
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "69ed2043f6c69d673da1272c",
  }));

  await Listing.insertMany(initData.data);
  console.log(initData.data);
};

initDB();  