const sampleListings = [
{
  title: "Cozy Beachfront Cottage",
  description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
  image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60" },
  price: 1500,
  location: "Malibu",
  country: "United States",
  category: "Beaches"
},
{
  title: "Modern Loft in Downtown",
  description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
  image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60" },
  price: 1200,
  location: "New York City",
  country: "United States",
  category: "Iconic cities"
},
{
  title: "Mountain Retreat",
  description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
  image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60" },
  price: 1000,
  location: "Aspen",
  country: "United States",
  category: "Mountain"
},
{
  title: "Historic Villa in Tuscany",
  description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
  image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60" },
  price: 2500,
  location: "Florence",
  country: "Italy",
  category: "Farms"
},
{
  title: "Secluded Treehouse Getaway",
  description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
  image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60" },
  price: 800,
  location: "Portland",
  country: "United States",
  category: "Camping"
},
{
  title: "Luxury Penthouse with City Views",
  description: "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
  image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60" },
  price: 3500,
  location: "Los Angeles",
  country: "United States",
  category: "Trending"
},
{
  title: "Ski-In/Ski-Out Chalet",
  description: "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
  image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=60" },
  price: 3000,
  location: "Verbier",
  country: "Switzerland",
  category: "Mountain"
},
{
  title: "Safari Lodge in the Serengeti",
  description: "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
  image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60" },
  price: 4000,
  location: "Serengeti National Park",
  country: "Tanzania",
  category: "Night Safari"
},
{
  title: "Historic Canal House",
  description: "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
  image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=60" },
  price: 1800,
  location: "Amsterdam",
  country: "Netherlands",
  category: "Iconic cities"
},
{
  title: "Private Island Retreat",
  description: "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
  image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?auto=format&fit=crop&w=800&q=60" },
  price: 10000,
  location: "Fiji",
  country: "Fiji",
  category: "Pools"
},
{
  title: "Historic Castle in Scotland",
  description: "Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.",
  image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=800&q=60" },
  price: 4000,
  location: "Scottish Highlands",
  country: "United Kingdom",
  category: "Castles"
},
{
  title: "Eco-Friendly Treehouse Retreat",
  description: "Stay in an eco-friendly treehouse nestled in the forest. It's the perfect escape for nature lovers.",
  image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?auto=format&fit=crop&w=800&q=60" },
  price: 750,
  location: "Costa Rica",
  country: "Costa Rica",
  category: "Camping"
},
{
  title: "Luxury Villa in the Maldives",
  description: "Indulge in luxury in this overwater villa in the Maldives with stunning views of the Indian Ocean.",
  image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=60" },
  price: 6000,
  location: "Maldives",
  country: "Maldives",
  category: "Pools"
},
{
  title: "Modern Glass Villa",
  description: "Experience luxury in the heart of the Swiss Alps. This glass-walled villa offers panoramic views.",
  image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=60" },
  price: 2500,
  location: "Zermatt",
  country: "Switzerland",
  category: "Trending"
},
{
  title: "Traditional Ryokan",
  description: "Immerse yourself in Japanese culture with tatami floors and a private onsen.",
  image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=60" },
  price: 1500,
  location: "Kyoto",
  country: "Japan",
  category: "Rooms"
}

  
];

module.exports = { data: sampleListings };