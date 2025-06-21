import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { dummyProducts } from "../../data/dummyProducts";

const ProductUpdate = () => {
  const params = useParams();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();
  const { data: categories = [] } = useFetchCategoriesQuery();

  // Find the product in dummy data
  const product = dummyProducts.find(p => p._id === params._id) || dummyProducts[0];

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setQuantity(product.quantity);
      setBrand(product.brand);
      setStock(product.countInStock);
      setImageUrl(`/assets/uploads/${product.image}`);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imageUrl = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(imageUrl);
      toast.success("Image updated successfully");
    } catch (error) {
      toast.error("Image update failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      toast.success(`Product successfully updated`);
      navigate('/admin/allproductslist');
    } catch (error) {
      console.log(error);
      toast.error("Product update failed. Try again");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;

      toast.success(`${name} is deleted`);
      navigate('/admin/allproductslist');
    } catch (error) {
      console.log(error);
      toast.error("Delete failed. Try again");
    }
  };

  return (
    <>
      <div className="container xl:mx-[5rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <div className="w-full md:w-3/4 p-3">
            <div className="text-lg font-bold mb-4 text-white">Update / Delete Product</div>

            {imageUrl && (
              <div className="text-center mb-4">
                <img
                  src={imageUrl}
                  alt="product"
                  className="block mx-auto max-h-[200px]"
                />
              </div>
            )}

            <div className="mb-6">
              <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                {image ? image.name : "Upload image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className="text-white"
                />
              </label>
            </div>

            <div className="p-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="block mb-2 text-white">
                  <label htmlFor="name">Name</label> <br />
                  <input
                    type="text"
                    className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="block mb-2 text-white">
                  <label htmlFor="name block">Price</label> <br />
                  <input
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="block mb-2 text-white">
                <div>
                  <label htmlFor="name block">Quantity</label> <br />
                  <input
                    type="number"
                    min="1"
                    className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="name block" className="block mb-2 text-white">Brand</label> <br />
                  <input
                    type="text"
                    className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="" className="block mb-2 text-white">
                  Description
                </label>
                <textarea
                  type="text"
                  className="p-4 w-full bg-[#3d3d3e] text-white border rounded-lg"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name block" className="block mb-2 text-white">Count In Stock</label> <br />
                  <input
                    type="text"
                    className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="" className="block mb-2 text-white">Category</label> <br />
                  <select
                    placeholder="Choose Category"
                    className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="">
                <button
                  onClick={handleSubmit}
                  className="py-4 px-6 sm:px-10 mt-5 rounded-lg text-lg font-bold bg-blue-600 text-white w-full sm:w-auto"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="py-4 px-6 sm:px-10 mt-5 ml-10 rounded-lg text-lg font-bold bg-pink-600 text-white w-full sm:w-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductUpdate;