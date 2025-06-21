// frontend/src/data/dummyProducts.js
const productNames = [
  "Wireless Headphones Pro",
  "Smart Watch Series 5",
  "Bluetooth Speaker X",
  "Fitness Tracker Elite",
  "Gaming Mouse RGB",
  "Mechanical Keyboard",
  "4K Monitor Stand",
  "USB-C 8-in-1 Hub",
  "1TB External SSD",
  "Noise Cancelling Earbuds",
  "Running Shoes Lite",
  "Leather Jacket Classic",
  "VR Headset Pro",
  "Designer Sunglasses",
  "Leather Laptop Bag",
  "Smart Watch Sport",
  "Wireless Earbuds Plus",
  "Backpack Travel",
  "Denim Jacket",
  "VR Controller Set",
  "Sports Headphones",
  "Formal Shoes",
  "Gaming Laptop",
  "Digital Watch",
  "Polarized Glasses",
  "Briefcase Professional",
  "Winter Jacket",
  "VR Gaming Bundle",
  "Studio Headphones",
  "Casual Sneakers",
  "Ultrabook Laptop",
  "Smart Watch Luxe",
  "Wireless Earbuds Mini",
  "Hiking Backpack",
  "Bomber Jacket",
  "VR Fitness Set",
  "Reading Glasses",
  "Messenger Bag",
  "Rain Jacket",
  "VR Educational Kit"
];

const categories = ["Headphones", "Watches", "Laptops", "VR", "Glasses", "Bags", "Jackets", "Shoes"];
const brands = ["TechGear", "UrbanStyle", "GadgetPlus", "EliteWear", "SoundMaster", "VisionPro", "TravelEssentials", "SportFit"];

// Image configuration
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || '/assets/uploads';
const TOTAL_PRODUCT_IMAGES = 40; // product-1.jpg to product-40.jpg

export const dummyProducts = productNames.map((name, index) => {
  const productImageNumber = (index % TOTAL_PRODUCT_IMAGES) + 1;
  const productImage = `product-${productImageNumber}.jpg`;

  return {
    _id: `prod_${index + 1}`,
    name,
    image: `${IMAGE_BASE_URL}/${productImage}`, // 👈 correct slash here
    description: `Premium ${name} with advanced features`,
    brand: brands[index % brands.length],
    category: categories[index % categories.length],
    price: Math.round((50 + Math.random() * 450) * 100) / 100,
    countInStock: Math.floor(Math.random() * 50) + 5,
    rating: Math.round((3 + Math.random() * 2) * 10) / 10,
    numReviews: Math.floor(Math.random() * 100),
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)).toISOString()
  };
});

// Helper functions
export const generateProductId = () => `prod_${Date.now()}`;
export const generateReviewId = () => `rev_${Date.now()}`;
