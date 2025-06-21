import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { generateProductId } from "../../data/dummyProducts";

const ProductList = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();
  const { data: categories } = useFetchCategoriesQuery();

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('image', file);
      
      // In a real app, you would upload to a server here
      // For now, we'll just use a client-side URL
      const imageUrl = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(imageUrl);
      toast.success("Image selected successfully");
    } catch (error) {
      toast.error("Image selection failed");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !category) {
      toast.error("Name, price and category are required");
      return;
    }

    try {
      // In a real app, you would upload the image to a server here
      // For now, we'll use either the uploaded image or a default
      const productImage = imageUrl || '/assets/uploads/default-product.jpg';

      const newProduct = {
        _id: generateProductId(),
        name,
        description,
        price: Number(price),
        category,
        quantity: Number(quantity),
        brand,
        countInStock: Number(stock),
        rating: 0,
        numReviews: 0,
        image: productImage,
        createdAt: new Date().toISOString()
      };

      // In a real app, you would save to your backend here
      console.log('New product:', newProduct);
      
      toast.success(`${newProduct.name} is created`);
      navigate('/admin/allproductslist');
    } catch (error) {
      console.log(error);
      toast.error("Product create failed. Try again");
    }
  };

  return (
    <div className="container xl:mx-[5rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="w-full md:w-3/4 p-3">
          <h2 className="text-lg font-bold mb-4 text-white">Create Product</h2>
          {imageUrl && (
            <div className="text-center mb-4">
              <img 
                src={imageUrl}
                alt="product preview" 
                className="block mx-auto max-h-[200px] object-contain" 
              />
            </div>
          )}

          <div className="mb-6">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload image..."}
              <input 
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
                onChange={uploadFileHandler} 
              />
            </label>
          </div>

          <div className="p-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-white">Name</label>
                <input 
                  type="text"
                  className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label htmlFor="price" className="block mb-2 text-white">Price</label>
                <input 
                  type="number"
                  className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block mb-2 text-white">Quantity</label>
                <input 
                  type="number"
                  className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label htmlFor="brand" className="block mb-2 text-white">Brand</label>
                <input 
                  type="text"
                  className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Enter brand"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block mb-2 text-white">Description</label>
              <textarea
                className="p-4 w-full bg-[#3d3d3e] text-white border rounded-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                rows="4"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="stock" className="block mb-2 text-white">Count In Stock</label>
                <input 
                  type="number" 
                  className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Enter stock count"
                />
              </div>  
              <div>
                <label htmlFor="category" className="block mb-2 text-white">Category</label>
                <select 
                  className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories?.length > 0 ? (
                    categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No categories available</option>
                  )}
                </select>
              </div>
            </div>

            <button 
              onClick={handleSubmit}
              className="py-4 px-6 sm:px-10 mt-5 rounded-lg text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;